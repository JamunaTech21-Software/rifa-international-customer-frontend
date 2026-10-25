import { apiGet } from '@/api/client'

/**
 * GET /jobs → published job listings in the admin's order (backend/docs/api.md).
 * Each API job is turned into the shape the cards already use (see data/jobs.js):
 *   imageKey        local stand-in photo for the original jobs (same slug), used when no photo was uploaded
 *   imagePublicId   the photo uploaded from the admin panel (public Cloudinary ID), or ''
 */
export function toJob(apiJob) {
  return {
    id: apiJob.slug,
    title: apiJob.title,
    employerType: apiJob.employer_type,
    category: apiJob.category?.slug ?? '',
    location: apiJob.location,
    salaryMin: apiJob.salary_min,
    salaryMax: apiJob.salary_max,
    description: apiJob.description ?? '',
    imageKey: `job.${apiJob.slug}`,
    imagePublicId: apiJob.image_public_id ?? '',
  }
}

export async function fetchJobs() {
  const response = await apiGet('/jobs')
  return response.data.map(toJob)
}
