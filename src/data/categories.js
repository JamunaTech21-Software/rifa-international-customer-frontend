import { BedDouble, Factory, Forklift, HardHat, SprayCan, Sprout } from 'lucide-react'

/**
 * The six job categories in Malaysia. `slug` is used in URLs (?category=<slug>) and by the API.
 *
 * @typedef {{
 *   slug: string,
 *   name: string,
 *   icon: import('lucide-react').LucideIcon,
 *   imageKey: string,
 *   jobsCount: string,
 * }} Category
 */

/** @type {Category[]} */
export const categories = [
  {
    slug: 'construction',
    name: 'Construction',
    icon: HardHat,
    imageKey: 'category.construction',
    jobsCount: '120+',
  },
  {
    slug: 'factory-manufacturing',
    name: 'Factory & Manufacturing',
    icon: Factory,
    imageKey: 'category.factory-manufacturing',
    jobsCount: '150+',
  },
  {
    slug: 'plantation-agriculture',
    name: 'Plantation & Agriculture',
    icon: Sprout,
    imageKey: 'category.plantation-agriculture',
    jobsCount: '80+',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    icon: BedDouble,
    imageKey: 'category.hospitality',
    jobsCount: '80+',
  },
  {
    slug: 'cleaning-service',
    name: 'Cleaning & Service',
    icon: SprayCan,
    imageKey: 'category.cleaning-service',
    jobsCount: '70+',
  },
  {
    slug: 'logistics-warehouse',
    name: 'Logistics & Warehouse',
    icon: Forklift,
    imageKey: 'category.logistics-warehouse',
    jobsCount: '90+',
  },
]

/** @param {string} slug @returns {Category | undefined} */
export function getCategory(slug) {
  return categories.find((category) => category.slug === slug)
}
