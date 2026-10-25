import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Phone, Search } from 'lucide-react'
import { ApiError } from '@/api/client'
import { checkApplicationStatus } from '@/api/status'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import TextInput from '@/components/form/TextInput'
import Turnstile from '@/components/form/Turnstile'
import { site } from '@/data/site'
import useCaptcha, { scrollToCaptchaError } from '@/features/captcha/useCaptcha'
import { statusDefaults, statusSchema } from '@/features/status/schema'

// API field name → form field name.
const FORM_FIELD_BY_API_FIELD = {
  reference_no: 'referenceNo',
  mobile: 'mobile',
  captcha_token: 'captchaToken',
}

// After a failed check, the message to show above the form.
function failureMessage(error) {
  if (error instanceof ApiError) {
    if (error.status === 404 || error.status === 429) return error.message
    if (error.status === 422) return 'Please check the highlighted fields.'
  }
  return `Something went wrong. Please try again or call us at ${site.phone}.`
}

/**
 * The "Check your application" form. initialReference — reference number to start with (from ?ref=…).
 * onResult(status) receives the API's answer; onReset() is called when a new check starts.
 */
export default function StatusForm({ initialReference = '', onResult, onReset }) {
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm({
    resolver: zodResolver(statusSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { ...statusDefaults, referenceNo: initialReference },
  })
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = form
  const captcha = useCaptcha(form)

  const onSubmit = async (values) => {
    setErrorMessage('')
    onReset()
    try {
      onResult(await checkApplicationStatus(values))
    } catch (error) {
      setErrorMessage(failureMessage(error))
      if (error instanceof ApiError && error.status === 422) {
        const apiFields = Object.keys(error.fields).filter((apiField) => FORM_FIELD_BY_API_FIELD[apiField])
        apiFields.forEach((apiField) =>
          setError(FORM_FIELD_BY_API_FIELD[apiField], { type: 'server', message: error.fields[apiField] }),
        )
        const first = FORM_FIELD_BY_API_FIELD[apiFields[0]] ?? 'referenceNo'
        if (first === 'captchaToken') scrollToCaptchaError()
        else setFocus(first)
      }
    } finally {
      captcha.reset() // a captcha token works once
    }
  }

  return (
    <form id="status-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert variant="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      <div className="space-y-4">
        <FormField
          label="Reference Number"
          required
          hint="From your confirmation, e.g. RIFA-20261015-00042."
          error={errors.referenceNo?.message}
        >
          <TextInput
            icon={FileText}
            placeholder="RIFA-20261015-00042"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            {...register('referenceNo')}
          />
        </FormField>
        <FormField
          label="Mobile Number"
          required
          hint="The number you used on your application."
          error={errors.mobile?.message}
        >
          <TextInput
            icon={Phone}
            type="tel"
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            {...register('mobile')}
          />
        </FormField>
      </div>
      <Turnstile {...captcha.widgetProps} className="mt-4" />

      <Button type="submit" size="lg" iconLeft={Search} loading={isSubmitting} fullWidth className="mt-5">
        {isSubmitting ? 'Checking…' : 'Check Status'}
      </Button>
    </form>
  )
}
