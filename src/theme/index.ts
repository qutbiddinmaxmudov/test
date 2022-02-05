import { createTheme, responsiveFontSizes  } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography:{
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  }
});

export default responsiveFontSizes(theme);