import { CssBaseline, ThemeProvider} from '@mui/material'
import { defaultDark } from '../../themes/themes'
import AppBar  from '../../components/AppBar/AppBar'



const Home = () => {

  return (
    <div>
        <ThemeProvider theme={defaultDark}>
          <CssBaseline />
          <AppBar>
          </AppBar>
        </ThemeProvider>
    </div>
  )
}

export default Home