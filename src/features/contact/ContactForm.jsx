import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Mail, MessageSquareText, Phone, Send, User } from 'lucide-react'
import { ApiError } from '@/api/client'
import { MESSAGE_FIELDS, sendMessage } from '@/api/messages'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import Select from '@/components/form/Select'
import Textarea from '@/components/form/Textarea'
import TextInput from '@/components/form/TextInput'
import { site } from '@/data/site'
import { contactDefaults, contactSchema } from '@/features/contact/schema'
import useLookups from '@/features/apply/useLookups'

// API field name → form field name (the reverse of MESSAGE_FIELDS).
const FORM_FIELD_BY_API_FIELD = Object.fromEntries(
  Object.entries(MESSAGE_FIELDS).map(([formField, apiField]) => [apiField, formField]),
)

// After a failed submit, scroll the first invalid field into view and focus it.
function focusFirstInvalid() {
  requestAnimationFrame(() => {
    const field = document.querySelector('#contact-form [aria-invalid="true"]')
    if (!field) return
    field.scrollIntoView({ behavior: 'smooth', block: 'center' })
    field.focus({ preventScroll: true })
  })
}

function failureMessage(error) {
  if (error instanceof ApiError) {
    if (error.status === 422) return 'Please check the highlighted fields.'
    if (error.status === 429) return 'Too many attempts. Please try again later.'
  }
  return `Something went wrong. Please try again or call us at ${site.phone}.`
}

/**
 * The "Send Us a Message" form.
 *
 * defaultSubject — subject value to preselect (from ?subject=…).
 * presetSubject  — { value, nonce }: when it changes, the subject select is set to value
 *                  (the inquiry cards use this so the same card can be clicked twice).
 * On success the form is replaced by a thank-you message with a "Send another message" button.
 */
export default function ContactForm({ defaultSubject = '', presetSubject }) {
  const lookups = useLookups()
  const [sent, setSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { ...contactDefaults, subject: defaultSubject },
  })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    if (presetSubject?.value) setValue('subject', presetSubject.value, { shouldValidate: true })
  }, [presetSubject, setValue])

  const onSubmit = async (values) => {
    setErrorMessage('')
    try {
      await sendMessage(values)
      setSent(true)
    } catch (error) {
      setErrorMessage(failureMessage(error))
      if (error instanceof ApiError && error.status === 422) {
        const fields = Object.keys(error.fields)
          .map((apiField) => FORM_FIELD_BY_API_FIELD[apiField])
          .filter(Boolean)
        fields.forEach((field) =>
          setError(field, { type: 'server', message: error.fields[MESSAGE_FIELDS[field]] }),
        )
        setFocus(fields[0] ?? 'fullName')
      }
    }
  }

  const sendAnother = () => {
    reset({ ...contactDefaults, subject: '' })
    setSent(false)
  }

  if (sent) {
    return (
      <div id="contact-form" role="status">
        <Alert variant="success" title="Message sent">
          Thank you! Your message has been sent. Our team will contact you soon.
        </Alert>
        <Button variant="outline" onClick={sendAnother} className="mt-4">
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      id="contact-form"
      noValidate
      onSubmit={handleSubmit(onSubmit, focusFirstInvalid)}
      className="scroll-mt-28"
    >
      {errorMessage && (
        <Alert variant="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      <div className="grid gap-x-3.5 gap-y-3 sm:grid-cols-2">
        <FormField label="Full Name" required error={errors.fullName?.message}>
          <TextInput
            icon={User}
            placeholder="Enter your full name"
            autoComplete="name"
            {...register('fullName')}
          />
        </FormField>
        <FormField label="Email Address" required error={errors.email?.message}>
          <TextInput
            icon={Mail}
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            {...register('email')}
          />
        </FormField>
        <FormField label="Phone Number" required error={errors.phone?.message}>
          <TextInput
            icon={Phone}
            type="tel"
            placeholder="Enter your phone number"
            autoComplete="tel"
            {...register('phone')}
          />
        </FormField>
        <FormField label="Subject" required error={errors.subject?.message}>
          <Select
            icon={FileText}
            placeholder="Select a subject"
            options={lookups.contactSubjects}
            {...register('subject')}
          />
        </FormField>
        <FormField label="Message" required error={errors.message?.message} className="sm:col-span-2">
          <Textarea
            icon={MessageSquareText}
            rows={4}
            placeholder="Write your message here..."
            {...register('message')}
          />
        </FormField>
      </div>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it, and the server rejects those. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        iconLeft={Send}
        iconRight
        loading={isSubmitting}
        fullWidth
        className="mt-5"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
