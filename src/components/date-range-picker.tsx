import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DateRangePickerProps {
  label?: string
  value?: DateRange
  onChange?: (date: DateRange | undefined) => void
  placeholder?: string
  numberOfMonths?: number
  disabled?: boolean
  className?: string
}

export function DateRangePicker({
  label,
  value,
  onChange,
  placeholder = 'Pick a date',
  numberOfMonths = 2,
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    },
  )

  const isControlled = value !== undefined
  const date = isControlled ? value : internalDate

  const handleSelect = (range: DateRange | undefined) => {
    if (!isControlled) setInternalDate(range)
    onChange?.(range)
  }

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor="date-picker-range">{label}</FieldLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            disabled={disabled}
            className="justify-start px-2.5 font-normal h-11 w-full"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} –{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
