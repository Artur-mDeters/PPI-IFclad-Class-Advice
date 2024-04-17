import React from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const containerStyle = {
  width: 400,
  height: "100vh",
  display: "flex", 
};

const boxFormStyle = {
    border: "1px solid #d6d6d6",
    padding: 6,
    borderRadius: 5
}

const Login = () => {
  return (
    <Container sx={containerStyle}>
      <Box margin="auto" sx={boxFormStyle}>
        <Box width={300} mb={2} textAlign="center">
          <Typography variant="h2">Login</Typography>
        </Box>
        <Box width={300} display="flex" flexDirection="column">
          <TextField
            sx={{ marginBottom: 3 }}
            id="email"
            label="Email"
            type="email"
            variant="filled"
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            variant="filled"
          />
        </Box>
        <Box mt={1}>
          <Button sx={{ margin: 2 }} size="large" variant="outlined" color="error">
            Cancelar
          </Button>
          <Button sx={{ margin: 2 }} size="large" variant="contained">
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
