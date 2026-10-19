import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Expandable question/answer list. Each header is a real <button> with aria-expanded and aria-controls,
 * so it works with keyboard (Enter / Space) and screen readers.
 *
 * items — [{ question, answer }]; answer is a string or a node.
 * defaultOpen — index of the item that starts open (default: none).
 * Only one item is open at a time.
 */
export default function Accordion({ items, defaultOpen = -1, className }) {
  const baseId = useId()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = open === index
        const buttonId = `${baseId}-q${index}`
        const panelId = `${baseId}-a${index}`
        return (
          <div key={item.question} className="rounded-card border border-line bg-white shadow-card">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 rounded-card px-5 py-4 text-left text-base font-semibold text-ink hover:text-primary-700"
              >
                {item.question}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    'shrink-0 text-primary-600 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-body"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
