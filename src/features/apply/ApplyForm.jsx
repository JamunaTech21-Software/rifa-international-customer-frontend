import { useWatch, Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, IdCard, Globe, Send } from 'lucide-react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/form/Checkbox'
import DateInput from '@/components/form/DateInput'
import FileDrop from '@/components/form/FileDrop'
import FormField from '@/components/form/FormField'
import PhoneInput from '@/components/form/PhoneInput'
import RadioGroup from '@/components/form/RadioGroup'
import Select from '@/components/form/Select'
import TextInput from '@/components/form/TextInput'
import Turnstile from '@/components/form/Turnstile'
import { ageFromDob } from '@/lib/age'
import { MAX_FILE_MB, applyDefaults, applySchema } from '@/features/apply/schema'
import useCaptcha, { scrollToCaptchaError } from '@/features/captcha/useCaptcha'
import useLookups from '@/features/apply/useLookups'

// The design's inputs are compact on desktop; keep them touch-friendly on phones.
const CONTROL = 'lg:h-9'

// After a failed submit, scroll the first invalid field into view and focus it.
function focusFirstInvalid() {
  requestAnimationFrame(() => {
    const field = document.querySelector('form [aria-invalid="true"]')
    if (!field) {
      scrollToCaptchaError()
      return
    }
    field.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (typeof field.focus === 'function') field.focus({ preventScroll: true })
  })
}

/**
 * The job application form (UI + client-side validation).
 *
 * defaultCategory — job category slug to preselect (from ?category=<slug>).
 * onSubmit(values, form) — called with validated values and the react-hook-form instance
 *   (so the caller can set server-side field errors); returns a promise, which keeps the button busy.
 * errorMessage — failure text from the last submit (shown as an error Alert above the fields).
 */
export default function ApplyForm({ defaultCategory = '', onSubmit, errorMessage = '' }) {
  const lookups = useLookups()
  const form = useForm({
    resolver: zodResolver(applySchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { ...applyDefaults, jobCategory: defaultCategory },
  })
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const captcha = useCaptcha(form)
  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' })
  const passportStatus = useWatch({ control, name: 'passportStatus' })
  const age = ageFromDob(dateOfBirth)

  return (
    <section className="overflow-hidden rounded-card border border-line bg-white shadow-card-hover">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-linear-to-r from-primary-700 to-primary-600 px-5 py-3.5 text-white sm:px-6">
        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
          <FileText size={26} aria-hidden="true" />
          Job Application Form
        </h2>
        <p className="text-xs text-white/90">All fields marked with * are required.</p>
      </header>

      <form
        noValidate
        onSubmit={handleSubmit(async (values) => {
          try {
            await onSubmit?.(values, form)
          } finally {
            captcha.reset() // a captcha token works once
          }
        }, focusFirstInvalid)}
        className="px-5 py-4 sm:px-6 sm:py-5"
      >
        {errorMessage && (
          <Alert variant="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}

        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          <FormField label="Full Name" required error={errors.fullName?.message}>
            <TextInput
              className={CONTROL}
              placeholder="Enter your full name"
              autoComplete="name"
              {...register('fullName')}
            />
          </FormField>
          <FormField label="Father's Name" required error={errors.fatherName?.message}>
            <TextInput
              className={CONTROL}
              placeholder="Enter your father's name"
              {...register('fatherName')}
            />
          </FormField>

          <div className="grid grid-cols-[1.25fr_1fr] gap-4">
            <FormField label="Date of Birth" required error={errors.dateOfBirth?.message}>
              <DateInput className={CONTROL} autoComplete="bday" {...register('dateOfBirth')} />
            </FormField>
            <FormField label="Age">
              <TextInput
                className={CONTROL}
                readOnly
                tabIndex={-1}
                value={age ?? ''}
                placeholder="(Auto)"
                aria-live="polite"
              />
            </FormField>
          </div>
          <FormField label="Gender" required group error={errors.gender?.message}>
            <RadioGroup options={lookups.genders} className="sm:min-h-9" {...register('gender')} />
          </FormField>

          <FormField label="National ID (NID) No." error={errors.nidNo?.message}>
            <TextInput
              className={CONTROL}
              inputMode="numeric"
              placeholder="Enter your NID number"
              {...register('nidNo')}
            />
          </FormField>
          <FormField label="Mobile Number" required error={errors.mobile?.message}>
            <PhoneInput className={CONTROL} {...register('mobile')} />
          </FormField>

          <FormField label="Email Address" error={errors.email?.message}>
            <TextInput
              className={CONTROL}
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              {...register('email')}
            />
          </FormField>
          <FormField label="Present Address" required error={errors.presentAddress?.message}>
            <TextInput
              className={CONTROL}
              autoComplete="street-address"
              placeholder="Enter your present address"
              {...register('presentAddress')}
            />
          </FormField>

          <FormField label="Preferred Job Category" required error={errors.jobCategory?.message}>
            <Select
              className={CONTROL}
              placeholder="Select job category"
              options={lookups.jobCategories}
              {...register('jobCategory')}
            />
          </FormField>
          <FormField label="Work Experience" error={errors.workExperience?.message}>
            <Select
              className={CONTROL}
              placeholder="Select experience (if any)"
              options={lookups.workExperience}
              {...register('workExperience')}
            />
          </FormField>

          <FormField label="Highest Education" error={errors.educationLevel?.message}>
            <Select
              className={CONTROL}
              placeholder="Select education level"
              options={lookups.educationLevels}
              {...register('educationLevel')}
            />
          </FormField>
          <FormField label="Passport Status" required group error={errors.passportStatus?.message}>
            <RadioGroup
              options={lookups.passportStatuses}
              className="sm:min-h-9"
              {...register('passportStatus')}
            />
          </FormField>
        </div>

        <fieldset className="mt-3.5">
          <legend className="mb-2 text-[0.9375rem] font-bold text-ink">Upload Documents</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="cv"
              render={({ field, fieldState }) => (
                <FileDrop
                  {...field}
                  label="Upload CV / Resume"
                  icon={IdCard}
                  maxSizeMb={MAX_FILE_MB}
                  typeMessage="CV must be a PDF, JPG or PNG file."
                  sizeMessage={`CV must be ${MAX_FILE_MB} MB or smaller.`}
                  error={fieldState.error?.message}
                  invalid={Boolean(fieldState.error)}
                />
              )}
            />
            <Controller
              control={control}
              name="passportCopy"
              render={({ field, fieldState }) => (
                <FileDrop
                  {...field}
                  label="Upload Passport Copy"
                  icon={Globe}
                  required={passportStatus === 'have_passport'}
                  maxSizeMb={MAX_FILE_MB}
                  typeMessage="Passport copy must be a PDF, JPG or PNG file."
                  sizeMessage={`Passport copy must be ${MAX_FILE_MB} MB or smaller.`}
                  error={fieldState.error?.message}
                  invalid={Boolean(fieldState.error)}
                />
              )}
            />
          </div>
        </fieldset>

        <div className="mt-3.5">
          <Checkbox
            invalid={Boolean(errors.declaration)}
            aria-invalid={errors.declaration ? true : undefined}
            aria-required="true"
            {...register('declaration')}
          >
            I confirm that the information provided is true and correct.
          </Checkbox>
          {errors.declaration && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-danger-600">
              {errors.declaration.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people and screen readers; bots tend to fill it, and the server rejects those. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </label>
        </div>

        <Turnstile {...captcha.widgetProps} className="mt-4 flex flex-col items-center" />

        <div className="mt-4 flex justify-center">
          <Button
            type="submit"
            size="lg"
            iconLeft={Send}
            loading={isSubmitting}
            className="w-full sm:w-[72%]"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </section>
  )
}
