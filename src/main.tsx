import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme, Container } from '@mui/material'
import { store } from './store'
import App from './App'
import './index.css'

const theme = createTheme({
  palette: { mode: 'light' },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <App />
        </Container>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
