'use client'

import { useState, ReactNode } from 'react'

interface AccordionItem {
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(index)
    }
  }

  return (
    <div className="space-y-2" role="region" aria-label="Accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const itemId = `accordion-item-${index}`
        const contentId = `accordion-content-${index}`
        
        return (
          <div key={index} className="border rounded-lg">
            <button
              id={itemId}
              className="w-full px-4 py-3 text-left font-semibold flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-t-lg"
              onClick={() => toggle(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span>{item.title}</span>
              <span 
                className="text-xl" 
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div 
                id={contentId}
                className="px-4 py-3 border-t"
                role="region"
                aria-labelledby={itemId}
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
