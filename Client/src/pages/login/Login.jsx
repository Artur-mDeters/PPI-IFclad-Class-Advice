import {
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./Login.css";
import imgTest from "../../assets/Education-amico.svg";
import { defaultLight } from "../../themes/themes";
import { useState } from "react";
import axios from "axios";

const boxFormStyle = {
  border: "1px solid #ccc",
  boxShadow: "0 0 5px #bebebe",
  padding: "20px 48px",
  borderRadius: 5,
  textAlign: "center",
  bgcolor: "#efecfc",
  width: "800px",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);
  
  const userRef = {
    email,
    password
  } 
  
  const handleSubmit = async () => {
    await axios.post("http://localhost:3030/login", userRef).then((response) => {
        console.log(response)
        return response
    }).catch((err) => {
        console.error(err)
    })
}

  return (
    <ThemeProvider theme={defaultLight}>
      <div id="principal-container">
        <Box sx={boxFormStyle} margin="auto" pt={0}>
          <Typography
            variant="h4"
            mb="20px"
            pb="10px"
            color="initial"
            sx={{ borderBottom: "1px solid #d8d8d8" }}
          >
            IF Clad - Class Advice
          </Typography>
          <Box display="flex">
            <Box height={300} width={400} paddingRight={10}>
              <img src={imgTest} alt="sla" />
            </Box>
            <Box width={300}>
              <Box width={300} mb={2} textAlign="center">
                <Typography
                  borderBottom="1px solid #d8d8d8"
                  pb="15px"
                  variant="h3"
                >
                  Login
                </Typography>
              </Box>
              <Box width={300} display="flex" flexDirection="column">
                <TextField
                  sx={{ marginBottom: 3 }}
                  id="email"
                  label="Email"
                  type="email"
                  variant="filled"
                  value={email}
                  onChange={handleSetEmail}
                />
                <TextField
                  id="password"
                  label="Senha"
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={handleSetPassword}
                />
              </Box>
              <Box mt="15px">
                <Button
                  sx={{ margin: 2 }}
                  size="large"
                  variant="outlined"
                  color="error"
                >
                  Cancelar
                </Button>
                <Button
                  sx={{ margin: 2 }}
                  size="large"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Entrar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Login;
