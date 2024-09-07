import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, Button } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";

const MyAccountPage = () => {
  return (
    <UiAppBar>
      <SearchBar>
        <Button variant="contained">
          Ola
        </Button>
      </SearchBar>
      <Box>{/* DataContainer */}</Box>
    </UiAppBar>
  );
};

export default MyAccountPage;
