import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ApiError } from '@/api/client'
import { APPLICATION_FIELDS, submitApplication } from '@/api/applications'
import { site } from '@/data/site'

// API field name → form field name (the reverse of APPLICATION_FIELDS).
const FORM_FIELD_BY_API_FIELD = Object.fromEntries(
  Object.entries(APPLICATION_FIELDS)
    .map(([formField, apiField]) => [apiField, formField])
    .concat([
      ['cv', 'cv'],
      ['passport_copy', 'passportCopy'],
    ]),
)

function messageFor(error) {
  if (error instanceof ApiError) {
    if (error.status === 422) return 'Please check the highlighted fields.'
    if (error.status === 429) return 'Too many attempts. Please try again later.'
  }
  return `Something went wrong. Please try again or call us at ${site.phone}.`
}

/**
 * Submits the application. Returns { submit, errorMessage }.
 *
 * submit(values, form) — pass to ApplyForm's onSubmit. On success it opens /apply/success with the API's
 * response; on a 422 it puts each field's message on the form field; other failures set errorMessage.
 * The form keeps everything the visitor typed. Double submits are prevented by the form's isSubmitting state.
 */
export default function useSubmitApplication() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const submit = async (values, form) => {
    setErrorMessage('')
    try {
      const result = await submitApplication(values)
      navigate('/apply/success', { state: result, replace: true })
    } catch (error) {
      setErrorMessage(messageFor(error))
      if (error instanceof ApiError && error.status === 422) {
        Object.entries(error.fields).forEach(([apiField, message]) => {
          const field = FORM_FIELD_BY_API_FIELD[apiField]
          if (field) form.setError(field, { type: 'server', message })
        })
        form.setFocus(
          Object.keys(error.fields)
            .map((apiField) => FORM_FIELD_BY_API_FIELD[apiField])
            .find(Boolean) ?? 'fullName',
        )
      }
    }
  }

  return { submit, errorMessage }
}
