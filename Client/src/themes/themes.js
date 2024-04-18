import { createTheme } from "@mui/material";

export const defaultDark = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#5d1c8b',
            light: '#7666e0',
            dark: '#20155f'
        },
    }
})

export const defaultLight = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#5d1c8b',
            light: '#7666e0',
            dark: '#20155f'
        }
    }
})