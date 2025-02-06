import axios from "axios";
import { Box, Typography, TextField, Button, OutlinedInput, Link } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Theme from "../../theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3030/login", {
        email,
        password,
      });
      const { token, userType } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      navigate("/");
    } catch (error) {
      setError("Email ou senha incorretos");
    }
  };

  return (
    <Theme>
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
          <Typography variant="h2" sx={{ marginTop: "90px" }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "15px" }}>
            Insira suas informações de login nos campos abaixo
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              margin: "250px auto",
            }}
          >
            <TextField
              id="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{ paddingBottom: 2 }}
            />
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link href="#">Esqueci minha senha...</Link>
            <Button
              onClick={handleLogin}
              sx={{ marginTop: 2 }}
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </Box>
        <Box sx={{ background: "#5d1c8b", height: "100vh", width: "100%" }} />
      </Box>
    </Theme>
  );
};

export default Login;