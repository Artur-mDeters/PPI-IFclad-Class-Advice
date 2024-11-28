import UiAppBar from "../../../components/AppBar/AppBar";
// import { Box, Button } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

import ThemeSelector from "../../../themes/ThemeSelector"; 

const Configuracoes = () => {

  return (
    <UiAppBar title={"Configurações"}>
      <SearchBar></SearchBar>
      {/* <ThemeSelector /> */}
    </UiAppBar>
  );
};

export default Configuracoes;
