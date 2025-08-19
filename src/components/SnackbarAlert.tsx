import { Snackbar, Alert } from '@mui/material'
import { hideSnackbar } from '../store/uiSlice'
import { useAppDispatch, useAppSelector } from '../store'

export default function SnackbarAlert() {
  const dispatch = useAppDispatch()
  const { open, message } = useAppSelector(s => s.ui.snackbar)

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="warning" variant="filled" onClose={() => dispatch(hideSnackbar())}>
        {message}
      </Alert>
    </Snackbar>
  )
}
