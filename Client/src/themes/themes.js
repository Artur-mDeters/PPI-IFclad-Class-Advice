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
        },
        text: {
            white: '#f4f4',
            secondary: '#222'
        }
    }
})
export const greenDark = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#196d00',
            light: '#28a300',
            dark: '#32c900'
        }
    }
})