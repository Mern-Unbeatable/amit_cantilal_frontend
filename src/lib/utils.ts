import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string
    locale?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    noDecimals?: boolean
  },
) {
  const {
    currency = 'EUR',
    locale = 'en-NG',
    minimumFractionDigits,
    maximumFractionDigits,
    noDecimals,
  } = opts ?? {}

  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  }

  return new Intl.NumberFormat(locale, formatOptions).format(amount)
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getInitials = (str: string): string => {
  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .toUpperCase() || '?'
  )
}

export const mainTransitionProps = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, damping: 5 },
  exit: { y: 60, opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 150,
    damping: 10,
  },
} as const

export const postTransitionProps = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, damping: 5 },
  exit: { y: 60, opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 150,
    damping: 10,
  },
} as const

/** Builds a wa.me link from a phone number (any formatting) and optional prefilled message. */
export function toWhatsAppUrl(number: string, message?: string): string {
  const digits = number.replace(/[^0-9]/g, '')
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`
}
