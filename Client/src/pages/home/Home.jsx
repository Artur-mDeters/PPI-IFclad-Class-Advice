import { CssBaseline, ThemeProvider} from '@mui/material'
import { defaultDark } from '../../themes/themes'
import SideBar from '../../components/sidebar/SideBar'

const Home = () => {


  return (
    <div>
        <ThemeProvider theme={defaultDark}>
          <CssBaseline />
          <SideBar />
        </ThemeProvider>
    </div>
  )
}

export default Home