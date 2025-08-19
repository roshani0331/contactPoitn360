import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import type { SlotInfo, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../styles/calendar.css'

import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { selectEvents } from '../store/dataSlice'
import { openDialog, setSelectedDateKey, showSnackbar } from '../store/uiSlice'
import { toKey } from '../utils/date'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

export default function BigCalendarView() {
  const dispatch = useAppDispatch()
  const events = useAppSelector(selectEvents)
  const [view, setView] = useState<View>(Views.MONTH)
  const selectedDateKey = useAppSelector((s) => s.ui.selectedDateKey)

  const onSelectEvent = useCallback((ev: any) => {
    const key = ev.key as string
    dispatch(setSelectedDateKey(key))
    dispatch(openDialog())
  }, [dispatch])

  const dayPropGetter = useCallback((date: Date) => {
    const key = toKey(date)
    const hasEvent = events.some((e) => toKey(e.start) === key)
    const classes: string[] = []
    if (hasEvent) classes.push('has-data')
    if (selectedDateKey === key) classes.push('selected')
    return { className: classes.join(' ') }
  }, [events, selectedDateKey])

  const handleSelectSlot = useCallback((slot: SlotInfo) => {
    const key = toKey(slot.start as Date)
    dispatch(setSelectedDateKey(key))
    const hasEvent = events.some((e) => toKey(e.start) === key)
    if (hasEvent) dispatch(openDialog())
    else dispatch(showSnackbar('No data found for the selected date.'))
  }, [dispatch, events])

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      titleAccessor="title"
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      view={view}
      onView={setView}
      selectable
      popup
      onSelectSlot={handleSelectSlot}
      onSelectEvent={onSelectEvent}
      style={{ height: 'calc(100vh - 160px)', minHeight: 500 }}
      dayPropGetter={dayPropGetter}
    />
  )
}
