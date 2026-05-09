import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#167AC8',
        },
        secondary: {
            main: '#F4511E',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;