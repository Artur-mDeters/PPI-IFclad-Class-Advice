
import {Box, Divider, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const navBox = {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
};

const inputStyle = {
    width: '450px',
}

// eslint-disable-next-line react/prop-types
const SearchBar = ({ children }) => {
    
  return (
    <>
      <Box component="nav" sx={navBox}>
        <Box flex={1} >{children}</Box>
        <Box>
          <TextField
            id="campo-busca"
            variant="outlined"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 2, my: 1 }} />
              ),
            }}
          />
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default SearchBar;
