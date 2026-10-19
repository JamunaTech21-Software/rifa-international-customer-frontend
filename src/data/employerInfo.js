import {
  BadgeCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  Plane,
  Scale,
  Stethoscope,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react'

/**
 * Content for the For Employers page. PLACEHOLDER COPY — the client has not supplied the final wording
 * yet; replace the text here only.
 */

/** "Why hire through RIFA" — six benefits. */
export const whyHire = [
  {
    icon: BadgeCheck,
    title: 'Government Licensed (RL-693)',
    text: 'A licensed recruiting agency you can trust to follow every rule.',
  },
  {
    icon: Users,
    title: 'Large Screened Talent Pool',
    text: 'Skilled and semi-skilled workers who are checked before they are shortlisted.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    text: 'A clear, organised process that keeps your hiring on schedule.',
  },
  {
    icon: Scale,
    title: 'Full Legal Compliance',
    text: 'Documentation, visa and BMET clearance handled correctly from start to finish.',
  },
  {
    icon: GraduationCap,
    title: 'Pre-Departure Training',
    text: 'Workers learn about work culture, safety and rules before they travel.',
  },
  {
    icon: HeartHandshake,
    title: 'After-Placement Support',
    text: 'We stay in touch with you and your workers after they arrive.',
  },
]

/** Employer hiring process — five steps (titles only). */
export const employerSteps = [
  { icon: FileText, title: 'Demand Letter & Requirements' },
  { icon: ClipboardCheck, title: 'Approval & Documentation' },
  { icon: UserCheck, title: 'Candidate Selection & Interview' },
  { icon: Stethoscope, title: 'Medical, Visa & BMET Processing' },
  { icon: Plane, title: 'Deployment' },
]
