import UiAppBar from "../../../components/AppBar/AppBar";
import { Box } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

const Configuracoes = () => {
  return (
    <UiAppBar>
      <SearchBar></SearchBar>
      <Box>{/* DataContainer  */}</Box>
    </UiAppBar>
  );
};

export default Configuracoes;
