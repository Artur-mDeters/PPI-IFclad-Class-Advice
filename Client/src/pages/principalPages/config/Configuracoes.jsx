import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { defaultDark } from "../../../themes/themes";

const Configuracoes = () => {
  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <UiAppBar>
        <SearchBar>
          
        </SearchBar>
        <Box>
          {/* DataContainer  */}
          
        </Box>
      </UiAppBar>
    </ThemeProvider>
  );
};

export default Configuracoes;
