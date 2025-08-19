import { subDays } from 'date-fns'
import { toKey } from './date'

export type DayData = { name: string; value: number }
export type DataMap = Record<string, DayData[]>

export const generateDummyData = (days = 45, users = 6): DataMap => {
  const now = new Date()
  const out: DataMap = {}

  for (let i = 0; i < days; i++) {
    const day = subDays(now, i)
    const key = toKey(day)
    const hasData = Math.random() > 0.45
    if (!hasData) continue

    const arr: DayData[] = []
    for (let u = 1; u <= users; u++) {
      arr.push({ name: `user_${u}`, value: Math.floor(Math.random() * 11) })
    }
    out[key] = arr
  }
  return out
}
