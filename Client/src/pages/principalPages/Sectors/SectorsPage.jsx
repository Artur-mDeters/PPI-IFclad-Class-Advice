import UiAppBar from "../../../components/AppBar/AppBar";
import { useNavigate } from "react-router-dom";
import { Box, Button,  } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";



const SectorsPage = () => {
  const navigate = useNavigate()

  const redirectToAddSectorPage = () => {
    navigate("./create")
  }
  return (
      <UiAppBar title={"Setores"}>
        <SearchBar>
          <Button variant="contained" onClick={redirectToAddSectorPage}>Adicionar Setor</Button>
        </SearchBar>
        <Box>
          {/* DataContainer  */}
          
        </Box>
      </UiAppBar>

  )
}

export default SectorsPage