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
            white: '#ffff',
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

// Tema greenLight corrigido
export const greenLight = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#196d00',
            light: '#28a300',
            dark: '#145200'
        },
        text: {
            primary: '#222',
            secondary: '#196d00'
        },
        background: {
            default: '#e8f5e9',  // Cor de fundo mais clara para combinar com o tema verde
            paper: '#ffffff',
        }
    }
});

// Novo tema: blueDark
export const blueDark = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#1c3c8b',
            light: '#4d6fc9',
            dark: '#142b61'
        },
        text: {
            primary: '#ffffff',
            secondary: '#a0c4ff'
        }
    }
});


// Novo tema: yellowDark
export const yellowDark = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: '#d1a700',
            light: '#ffe54c',
            dark: '#997300'
        },
        background: {
            default: '#2b2a1f',
            paper: '#3e3c29'
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffeb3b'
        }
    }
});

// Novo tema: purpleLight
export const purpleLight = createTheme({
    palette:{
        mode: 'light',
        primary: {
            main: '#6a1b9a',
            light: '#9c4dcc',
            dark: '#38006b'
        },
        background: {
            default: '#f3e5f5',
            paper: '#ffffff'
        },
        text: {
            primary: '#222',
            secondary: '#6a1b9a'
        }
    }
});

// Tema Orange Dark
export const orangeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6f00',
      light: '#ffa040',
      dark: '#c43e00'
    },
    background: {
      default: '#212121',
      paper: '#333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffcc80'
    }
  }
});

// Tema Pink Light
export const pinkLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e91e63',
      light: '#ff6090',
      dark: '#b0003a'
    },
    background: {
      default: '#fce4ec',
      paper: '#ffffff'
    },
    text: {
      primary: '#212121',
      secondary: '#e91e63'
    }
  }
});

// Tema Cyan Dark
export const cyanDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00acc1',
      light: '#5ddef4',
      dark: '#007c91'
    },

    text: {
      primary: '#e0f7fa',
      secondary: '#00acc1'
    }
  }
});

// Tema Teal Light
export const tealLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00897b',
      light: '#4ebaaa',
      dark: '#005b4f'
    },
    background: {
      default: '#e0f2f1',
      paper: '#ffffff'
    },
    text: {
      primary: '#004d40',
      secondary: '#00897b'
    }
  }
});

// Tema Indigo Dark
export const indigoDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984'
    },

    text: {
      primary: '#ffffff',
      secondary: '#7986cb'
    }
  }
});

// Tema de Alto Contraste
export const highContrast = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',   // Branco para o texto primário
      light: '#ffffff',  // Mantém o branco para áreas claras
      dark: '#000000',   // Preto profundo para o fundo e componentes escuros
    },

    text: {
      primary: '#ffffff',  // Texto principal branco puro
      secondary: '#ffea00', // Texto secundário amarelo brilhante para maior contraste
    },
    divider: '#ffffff',     // Divisores brancos para alta visibilidade
    action: {
      active: '#ffea00',    // Elementos interativos em amarelo
      hover: '#ffea00',
      selected: '#ffea00',
    },
  },
});

export const grayDarkTheme = createTheme({
    palette: {
      mode: 'dark',  // Tema escuro
      primary: {
        main: '#424242',   // Cinza médio escuro como cor primária
        light: '#6d6d6d',  // Cinza claro
        dark: '#1b1b1b',   // Preto suave como cor de destaque
      },
      text: {
        primary: '#e0e0e0',  // Texto cinza claro para contraste com o fundo escuro
        secondary: '#bdbdbd', // Texto secundário em cinza médio
      },
      divider: '#757575',  // Divisores em cinza
    },
  });