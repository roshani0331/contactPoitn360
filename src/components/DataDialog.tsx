import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { useAppDispatch, useAppSelector } from '../store'
import { closeDialog } from '../store/uiSlice'
import { selectDayDataFactory } from '../store/dataSlice'

export default function DataDialog() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(s => s.ui.dialogOpen)
  const selectedDateKey = useAppSelector(s => s.ui.selectedDateKey)

  const selector = React.useMemo(
    () => selectDayDataFactory(selectedDateKey ?? ''),
    [selectedDateKey]
  )
  const data = useAppSelector(selector)

  return (
    <Dialog open={open} onClose={() => dispatch(closeDialog())} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', pr: 6 }}>
        Data for {selectedDateKey ?? '—'}
        <IconButton
          onClick={() => dispatch(closeDialog())}
          sx={{ position: 'absolute', right: 12, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {data && data.length ? (
          <Box sx={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Typography>No data found for the selected date.</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}
