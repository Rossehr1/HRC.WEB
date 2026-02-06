/**
 * Validation utilities for forms
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

/**
 * Validates a required text field
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` }
  }

  if (value.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` }
  }

  return { isValid: true }
}

/**
 * Validates a phone number (optional, but if provided must be valid)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { isValid: true } // Phone is optional
  }

  // Basic phone validation (allows various formats)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
    return { isValid: false, error: 'Please enter a valid phone number' }
  }

  return { isValid: true }
}

/**
 * Validates a date (must be in the future for event dates)
 */
export function validateFutureDate(date: string): ValidationResult {
  if (!date) {
    return { isValid: false, error: 'Date is required' }
  }

  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return { isValid: false, error: 'Event date must be in the future' }
  }

  return { isValid: true }
}

/**
 * Sanitizes input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
}

/**
 * Validates honeypot field (should be empty)
 */
export function validateHoneypot(value: string): ValidationResult {
  if (value && value.trim() !== '') {
    return { isValid: false, error: 'Spam detected' }
  }
  return { isValid: true }
}

/**
 * Validates message length
 */
export function validateMessage(message: string, minLength = 10, maxLength = 5000): ValidationResult {
  if (!message || message.trim() === '') {
    return { isValid: false, error: 'Message is required' }
  }

  const trimmed = message.trim()
  if (trimmed.length < minLength) {
    return { isValid: false, error: `Message must be at least ${minLength} characters` }
  }

  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Message must be no more than ${maxLength} characters` }
  }

  return { isValid: true }
}

/**
 * Checks if a string is a valid email address
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Clamps a string to a maximum length
 */
export function clampLen(value: string, max: number): string {
  const v = value ?? "";
  return v.length > max ? v.slice(0, max) : v;
}
