// Brand glyphs (lucide-react 1.x no longer ships brand icons). Inherit colour from currentColor.
const paths = {
  facebook: 'M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H6v4h3v9h4v-9h3l1-4h-4V9c0-.55.45-1 1-1z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z',
  youtube:
    'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6z',
}

export default function SocialIcon({ network, size = 18, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[network]} />
    </svg>
  )
}
