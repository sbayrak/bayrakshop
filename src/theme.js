import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4062bb',
    },
    secondary: {
      main: '#fafafa',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f6f6f6',
    },
  },
});

export default theme;
