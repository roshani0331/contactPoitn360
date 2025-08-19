import { createSlice, createSelector } from '@reduxjs/toolkit'
import { generateDummyData, type DataMap } from '../utils/generateData'
import { keyToDate } from '../utils/date'

export interface CalendarEvent {
  title: string
  start: Date
  end: Date
  allDay: boolean
  key: string  
}

type DataState = {
  map: DataMap
}

const initialState: DataState = {
  map: generateDummyData(45, 6)
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {}
})

export default dataSlice.reducer

export const selectDataMap = (s: { data: DataState }) => s.data.map

export const selectEvents = createSelector([selectDataMap], (map): CalendarEvent[] => {
  return Object.entries(map).map(([k, arr]) => {
    const date = keyToDate(k)
    const total = arr.reduce((sum, d) => sum + d.value, 0)
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
    return {
      title: `${total} record${total === 1 ? '' : 's'}`,
      start,
      end,
      allDay: true,
      key: k
    }
  })
})

export const selectDayDataFactory = (key: string) =>
  createSelector([selectDataMap], (map) => map[key] ?? null)

export const hasDataForDateFactory = (key: string) =>
  createSelector([selectDataMap], (map) => Boolean(map[key]))
