import {
  BedDouble,
  Coins,
  FileText,
  GraduationCap,
  Handshake,
  Headset,
  IdCard,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'

/**
 * Information for applicants, shared by the Apply, Recruitment Process and For Job Seekers pages.
 *
 * @typedef {{ icon: import('lucide-react').LucideIcon, title: string, note?: string }} InfoItem
 */

/** "Why Apply with Rifa International?" — six benefits. @type {InfoItem[]} */
export const whyApply = [
  { icon: ShieldCheck, title: 'Government Approved Recruiting Agency (RL-693)' },
  { icon: Users, title: 'Genuine Job Opportunities in Malaysia' },
  { icon: Handshake, title: 'Safe, Legal & Transparent Process' },
  { icon: BedDouble, title: 'Accommodation (As per Employer)' },
  { icon: Coins, title: 'Attractive Salary & Overtime' },
  { icon: Headset, title: 'Full Support from Application to Departure' },
]

/** "Basic Requirements" — four cards. @type {InfoItem[]} */
export const basicRequirements = [
  { icon: IdCard, title: 'Valid Passport', note: '(or ready to apply)' },
  { icon: UserRound, title: 'Age', note: '18 – 45 Years (Varies by Job)' },
  { icon: GraduationCap, title: 'Minimum Physical Fitness' },
  { icon: FileText, title: 'Job-specific Skills/Experience', note: '(if required)' },
]

/** "Required Documents" checklist. @type {string[]} */
export const requiredDocuments = [
  'Valid Passport (minimum 18 months)',
  'NID Copy',
  'Recent Passport Size Photo',
  'Educational Certificate (if applicable)',
  'Other documents as per job requirements',
]

/** Fraud warning shown on pages for applicants. */
export const noFeeWarning =
  'Rifa International (RL-693) does not charge any fee for online application. Beware of fraud agents and only contact us through our official numbers.'
