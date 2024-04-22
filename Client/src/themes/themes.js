import { createTheme } from "@mui/material";

export const defaultDark = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#5d1c8b',
            light: '#7666e0',
            dark: '#451c8b'
        },
    }
})

export const defaultLight = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#5d1c8b',
            light: '#7666e0',
            dark: '#451c8b'
        }
    }
})