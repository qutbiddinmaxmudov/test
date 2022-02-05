import React from 'react'
import theme from './theme'
import createEmotionCache from './theme/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Catalog from './Catalog'

const cache = createEmotionCache()

function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Catalog />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
