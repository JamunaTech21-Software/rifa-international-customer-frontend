// Full years between a date of birth ("YYYY-MM-DD" or Date) and today. Returns null for empty/invalid/future dates.
export function ageFromDob(dob, today = new Date()) {
  if (!dob) return null
  const birth = dob instanceof Date ? dob : new Date(`${dob}T00:00:00`)
  if (Number.isNaN(birth.getTime()) || birth > today) return null

  let age = today.getFullYear() - birth.getFullYear()
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  if (beforeBirthday) age -= 1
  return age
}
