import { categories } from '@/data/categories'

/**
 * Dropdown and radio options for the Apply and Contact forms. These are the fallback used when
 * GET /lookups fails (or in mock mode); they mirror the backend's lookups, so the `value`s are
 * exactly what the API expects (backend/docs/api.md → GET /lookups).
 * Every option is { value, label }.
 */
export const fallbackLookups = {
  jobCategories: categories.map((category) => ({ value: category.slug, label: category.name })),
  genders: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
  workExperience: [
    { value: 'none', label: 'No experience' },
    { value: 'lt_1', label: 'Less than 1 year' },
    { value: '1_2', label: '1–2 years' },
    { value: '3_5', label: '3–5 years' },
    { value: 'gt_5', label: 'More than 5 years' },
  ],
  educationLevels: [
    { value: 'none', label: 'No formal education' },
    { value: 'psc', label: 'PSC' },
    { value: 'jsc', label: 'JSC/JDC' },
    { value: 'ssc', label: 'SSC/Dakhil' },
    { value: 'hsc', label: 'HSC/Alim' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelor' },
    { value: 'masters', label: 'Masters or above' },
  ],
  passportStatuses: [
    { value: 'have_passport', label: 'Have Passport' },
    { value: 'will_apply', label: 'Will Apply Soon' },
  ],
  contactSubjects: [
    { value: 'general_inquiry', label: 'General Inquiry' },
    { value: 'job_application', label: 'Job Application' },
    { value: 'employer_partnership', label: 'Employer Partnership' },
    { value: 'support', label: 'Support' },
  ],
}
