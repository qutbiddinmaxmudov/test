import React from 'react'
import theme from './theme'
import createEmotionCache from './theme/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Catalog from './Catalog'
import { Box } from '@mui/system'

const cache = createEmotionCache()

function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: 'linear-gradient(90deg, gray, black)',
            minHeight: '100vh',
          }}
        >
          <Catalog />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
