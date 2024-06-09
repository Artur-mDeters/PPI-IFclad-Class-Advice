import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, Button, CssBaseline, ThemeProvider } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { defaultDark } from "../../../themes/themes";

const Mostra = () => {
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <UiAppBar>
        <SearchBar>
          <Button variant="contained">Adicionar Grupo</Button>
        </SearchBar>
        <Box>
          {/* DataContainer  */}
          
        </Box>
      </UiAppBar>
    </ThemeProvider>
  )
}

export default Mostra