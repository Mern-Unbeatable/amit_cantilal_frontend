import type { PublicBlockedDateRange } from '@/features/blocked-dates/blocked-dates.types.ts'

const DEFAULT_MESSAGE =
  "We're at limited availability for this period due to a special event. Please reach out to us directly by email or WhatsApp to book."

/** Local-date parse (not UTC) so "2026-09-29" means Sept 29 everywhere, not
 *  a day earlier/later depending on the viewer's timezone offset. Also
 *  tolerates a full ISO datetime ("2026-09-29T00:00:00.000000Z") in case
 *  the API ever serializes a date field that way, since only the date
 *  portion is used either way. */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('T')[0].split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function findBlockedRange(
  date: Date,
  ranges: Array<PublicBlockedDateRange> | undefined,
): PublicBlockedDateRange | undefined {
  if (!ranges?.length) return undefined

  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime()

  return ranges.find((range) => {
    const start = parseLocalDate(range.start_date).getTime()
    const end = parseLocalDate(range.end_date).getTime()
    return target >= start && target <= end
  })
}

export function blockedRangeMessage(range: PublicBlockedDateRange): string {
  return range.message?.trim() || DEFAULT_MESSAGE
}

/**
 * react-day-picker matchers, one {from, to} per range. These are used as a
 * custom `blocked` modifier, NOT the `disabled` prop: a truly `disabled`
 * day picker button never fires a click event in the browser, so a real
 * `disabled` day could never open the "reach out" popup. Blocked days stay
 * clickable and are only styled to look unavailable; onSelect intercepts
 * the click and opens the dialog instead of applying the selection.
 */
export function toBlockedMatchers(
  ranges: Array<PublicBlockedDateRange> | undefined,
) {
  return (ranges ?? []).map((range) => ({
    from: parseLocalDate(range.start_date),
    to: parseLocalDate(range.end_date),
  }))
}
