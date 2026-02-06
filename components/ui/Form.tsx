'use client'

import { FormEvent, ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  className?: string
}

export default function Form({ children, onSubmit, className = '' }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}

interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  className?: string
}

export function FormField({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  placeholder,
  className = '' 
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        aria-required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  )
}

interface FormTextareaProps {
  label: string
  name: string
  required?: boolean
  placeholder?: string
  rows?: number
  className?: string
}

export function FormTextarea({ 
  label, 
  name, 
  required = false, 
  placeholder,
  rows = 4,
  className = '' 
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        aria-required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  )
}
