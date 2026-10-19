import { apiPostForm } from '@/api/client'
import { normalizeMobile } from '@/features/apply/schema'

// Form field names (camelCase) → API field names (snake_case). Used both ways.
export const APPLICATION_FIELDS = {
  fullName: 'full_name',
  fatherName: 'father_name',
  dateOfBirth: 'date_of_birth',
  gender: 'gender',
  nidNo: 'nid_no',
  mobile: 'mobile',
  email: 'email',
  presentAddress: 'present_address',
  jobCategory: 'job_category',
  workExperience: 'work_experience',
  educationLevel: 'education_level',
  passportStatus: 'passport_status',
  declaration: 'declaration',
  website: 'website',
}

/** Builds the multipart body for POST /applications from validated form values. */
export function buildApplicationFormData(values) {
  const form = new FormData()

  Object.entries(APPLICATION_FIELDS).forEach(([key, apiKey]) => {
    const value = values[key]
    if (key === 'declaration') form.append(apiKey, value ? '1' : '0')
    else if (key === 'mobile') form.append(apiKey, normalizeMobile(value) ?? value)
    else if (key === 'website')
      form.append(apiKey, value ?? '') // honeypot — always sent, normally empty
    else if (value) form.append(apiKey, String(value).trim())
  })

  if (values.cv) form.append('cv', values.cv)
  if (values.passportCopy) form.append('passport_copy', values.passportCopy)

  return form
}

/** POST /applications → { reference_no, submitted_at, confirmation_email_sent }. Throws ApiError. */
export async function submitApplication(values) {
  const response = await apiPostForm('/applications', buildApplicationFormData(values))
  return response.data
}
