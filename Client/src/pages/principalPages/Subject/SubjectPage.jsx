import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { Box, Button } from "@mui/material";

const SubjectPage = () => {
  return (
    <UiAppBar>
      <SearchBar>
        <Button variant="contained">Adicionar Disciplina</Button>
      </SearchBar>
      <Box>
        {/* DataContainer  */}
      </Box>
    </UiAppBar>
  );
};

export default SubjectPage;
