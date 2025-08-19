import { format, parse } from 'date-fns'

export const DATE_FMT = 'dd-MM-yyyy'
export const toKey = (d: Date) => format(d, DATE_FMT)
export const keyToDate = (key: string) => parse(key, DATE_FMT, new Date())
