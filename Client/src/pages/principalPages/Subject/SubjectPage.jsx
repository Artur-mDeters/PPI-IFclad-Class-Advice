import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SubjectPage = () => {
  const navigate = useNavigate()

  const redirectToCreateSubjectPage = () => {
    navigate("./create")
  }

  return (
    <UiAppBar>
      <SearchBar>
        <Button variant="contained" onClick={redirectToCreateSubjectPage}>Adicionar Disciplina</Button>
      </SearchBar>
      <Box>
        {/* DataContainer  */}
      </Box>
    </UiAppBar>
  );
};

export default SubjectPage;
