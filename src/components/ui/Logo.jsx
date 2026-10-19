import logoColor from '@/assets/brand/rifa-logo.png'
import logoWhite from '@/assets/brand/rifa-logo-white.png'
import { cn } from '@/lib/cn'

// Temporary raster logo cropped from the reference designs — swap the PNGs for the official SVG when available.
export default function Logo({ variant = 'color', className }) {
  return (
    <img
      src={variant === 'white' ? logoWhite : logoColor}
      alt="Rifa International"
      width={190}
      height={64}
      className={cn('h-12 w-auto sm:h-14', className)}
    />
  )
}
