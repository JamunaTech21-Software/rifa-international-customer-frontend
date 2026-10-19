import { useRef, useState } from 'react'
import { CloudUpload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatFileSize } from '@/lib/format'

const DEFAULT_ACCEPT = '.pdf,.jpg,.jpeg,.png'

function acceptLabel(accept) {
  return accept
    .split(',')
    .map((ext) => ext.trim().replace('.', '').toUpperCase())
    .filter((ext) => ext !== 'JPEG')
    .join(', ')
}

/**
 * Click or drag-and-drop file picker. Controlled: `value` (File | null) + `onChange(file | null)` —
 * use react-hook-form's <Controller>. Rejects wrong types and files over maxSizeMb with an inline error.
 *
 * typeMessage / sizeMessage — replace the built-in rejection texts (e.g. "CV must be a PDF, JPG or PNG file.").
 *
 * variant="row"  — icon box + title + hint in one dashed row (Apply form, design 1).
 * variant="tile" — titled card with a dashed "Click to upload or drag and drop" area (Apply form, design 2).
 */
export default function FileDrop({
  label,
  hint,
  icon: Icon = FileText,
  accept = DEFAULT_ACCEPT,
  maxSizeMb = 5,
  value = null,
  onChange,
  onBlur,
  name,
  required = false,
  typeMessage,
  sizeMessage,
  variant = 'row',
  error,
  invalid = false,
  id,
  className,
  'aria-describedby': describedBy,
  ref,
}) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [localError, setLocalError] = useState('')

  const shownError = localError || error
  const errorId = id && localError ? `${id}-file-error` : undefined
  const hintText = hint ?? `(${acceptLabel(accept)} | Max ${maxSizeMb} MB)`

  const setRefs = (el) => {
    inputRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  const pick = (file) => {
    if (!file) return
    const allowed = accept.split(',').map((ext) => ext.trim().toLowerCase())
    const ext = `.${file.name.split('.').pop().toLowerCase()}`
    if (!allowed.includes(ext)) {
      setLocalError(typeMessage ?? `Please upload a ${acceptLabel(accept)} file.`)
      return
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      setLocalError(sizeMessage ?? `File is too large. Maximum size is ${maxSizeMb} MB.`)
      return
    }
    setLocalError('')
    onChange?.(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    pick(event.dataTransfer.files?.[0])
  }

  const dragProps = {
    onDragOver: (event) => {
      event.preventDefault()
      setDragOver(true)
    },
    onDragLeave: () => setDragOver(false),
    onDrop: handleDrop,
  }

  const zoneState = cn(
    'border-2 border-dashed transition-colors',
    dragOver
      ? 'border-primary-500 bg-primary-50'
      : 'border-line-strong hover:border-primary-400 hover:bg-surface',
    (invalid || shownError) && !dragOver && 'border-danger-600',
  )

  const ariaDescribedBy = [describedBy, errorId].filter(Boolean).join(' ') || undefined

  const selected = value && (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5">
      <FileText size={20} className="shrink-0 text-primary-600" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{value.name}</p>
        <p className="text-xs text-muted">{formatFileSize(value.size)}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          onChange?.(null)
          inputRef.current?.focus()
        }}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-danger-50 hover:text-danger-600"
        aria-label={`Remove ${value.name}`}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )

  const input = (
    <input
      ref={setRefs}
      id={id}
      name={name}
      type="file"
      accept={accept}
      className="sr-only"
      tabIndex={-1}
      aria-hidden="true"
      onChange={(event) => {
        pick(event.target.files?.[0])
        event.target.value = ''
      }}
    />
  )

  const titleText = (
    <>
      {label}
      {required && (
        <span className="ml-0.5 text-danger-600" aria-hidden="true">
          *
        </span>
      )}
    </>
  )

  return (
    <div className={cn('min-w-0', className)}>
      {input}

      {variant === 'tile' ? (
        <div className="flex h-full flex-col gap-3 rounded-card border border-line bg-white p-3 shadow-card">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon size={18} className="shrink-0 text-ink" aria-hidden="true" />
            <span>{titleText}</span>
          </p>
          {selected || (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onBlur={onBlur}
              aria-describedby={ariaDescribedBy}
              aria-invalid={invalid || shownError ? true : undefined}
              aria-label={`Upload ${label}`}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg px-3 py-5 text-center',
                zoneState,
              )}
              {...dragProps}
            >
              <CloudUpload size={26} className="text-muted" aria-hidden="true" />
              <span className="text-sm text-muted">
                <span className="font-semibold text-primary-600">Click to upload</span>
                <br />
                or drag and drop
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className={cn('rounded-card bg-white', !value && zoneState, value && 'border border-line p-3')}>
          {selected || (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onBlur={onBlur}
              aria-describedby={ariaDescribedBy}
              aria-invalid={invalid || shownError ? true : undefined}
              className="flex w-full items-center gap-3.5 rounded-card px-4 py-3 text-left sm:px-5"
              {...dragProps}
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink">{titleText}</span>
                <span className="block text-sm text-muted">{hintText}</span>
              </span>
            </button>
          )}
        </div>
      )}

      {localError && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-danger-600">
          {localError}
        </p>
      )}
      {!localError && error && (
        <p role="alert" className="mt-1.5 text-sm font-medium text-danger-600">
          {error}
        </p>
      )}
    </div>
  )
}
