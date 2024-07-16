import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography, TextField, Button, FilledInput, OutlinedInput } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { defaultDark } from "../../themes/themes";
import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [siape, setSiape] = useState("");
  const [type, setType] = useState(undefined);
  

  const [showPassword, setShowPassWord] = useState(false);

  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);
  const handleSetName = (e) => setName(e.target.value);
  const handleSetSiape = (e) => setSiape(e.target.value);
  const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleShowPassword = () => {
    const pass = !showPassword;
    setShowPassWord(pass);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3030/users", {
        email: email,
        password: password,
        name: name,
        siape: siape,
        type: type
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputClasses = {
    paddingBottom: 2,
  };

  return (
    <ThemeProvider theme={defaultDark}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 560,
            height: "100vh",
            textAlign: "center",
            paddingBottom: "90px",
          }}
        >
          <Typography variant="h2" sx={{ marginTop: "40px" }}>
            Cadastro
          </Typography>
          <Typography variant="body2" sx={{ flex: 1, marginTop: "15px" }}>
            Insira suas informações de cadastro nos campos a baixo
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "0 auto",
            }}
            className="inputs"
          >
            <TextField
              id="name"
              label="Nome Completo"
              value={name}
              onChange={handleSetName}
              variant="outlined"
              sx={inputClasses}
            />
            <TextField
              id="email"
              label="E-mail"
              value={email}
              onChange={handleSetEmail}
              variant="outlined"
              sx={inputClasses}
            />
            <FormControl sx={inputClasses} variant="filled">
              <InputLabel htmlFor="standard-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleSetPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={inputClasses} variant="filled">
              <InputLabel htmlFor="standard-adornment-confirm-password">
                Confirme sua senha
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleSetConfirmPassword}
                
              />
            </FormControl>
            <TextField
              id="siape"
              label="Siape"
              value={siape}
              onChange={handleSetSiape}
              variant="outlined"
              sx={inputClasses}
            />
            <Box sx={{}} className="groupInputTypeUser">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value="1"
                    onChange={() => setType(1)}
                    control={<Radio />}
                    label="Professor"
                  />
                  <FormControlLabel
                    value="2"
                    onChange={() => setType(2)}
                    control={<Radio />}
                    label="Servidor"
                  />
                  <FormControlLabel
                    value="3"
                    onChange={() => setType(3)}
                    control={<Radio />}
                    label="Setor"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Button
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
              variant="contained"
            >
              Enviar
            </Button>
          </Box>
        </Box>
        <Box sx={{ background: "#5d1c8b", height: "100vh", width: "100%" }}>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
