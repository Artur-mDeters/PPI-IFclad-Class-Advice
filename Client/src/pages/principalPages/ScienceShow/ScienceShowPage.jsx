import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, Button } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

const ScienceShowPage = () => {
  return (
    <UiAppBar>
        <SearchBar>
          <Button variant="contained">Adicionar Grupo</Button>
        </SearchBar>
        <Box>
          {/* DataContainer  */}
          
        </Box>
      </UiAppBar>
  )
}

export default ScienceShowPage