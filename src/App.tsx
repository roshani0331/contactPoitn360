import { Box, Typography } from '@mui/material'
import BigCalendarView from './components/BigCalendarView'
import DataDialog from './components/DataDialog'
import SnackbarAlert from './components/SnackbarAlert'

export default function App() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        ContactPoint360 — Big Calendar with Bar Graph
      </Typography>
      <BigCalendarView />
      <DataDialog />
      <SnackbarAlert />
    </Box>
  )
}
