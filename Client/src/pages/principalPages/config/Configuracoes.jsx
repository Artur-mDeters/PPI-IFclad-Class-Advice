import UiAppBar from "../../../components/AppBar/AppBar";
// import { Box, Button } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
// import { useState } from "react";
// import { defaultDark, defaultLight } from "../../../themes/themes";

const Configuracoes = () => {
  // const [theme, setTheme] = useState(defaultDark)

  return (
    <UiAppBar title={"Configurações"}>
      <SearchBar></SearchBar>
      {/* children  */}
    </UiAppBar>
  );
};

export default Configuracoes;
