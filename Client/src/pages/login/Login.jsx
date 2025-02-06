// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3030/login', { email, password });
//       const { token, userType } = response.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('userType', userType);
//       navigate('/dashboard');
//     } catch (error) {
//       setError('Email ou senha incorretos');
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Typography variant="h4" gutterBottom>Login</Typography>
//       {error && <Typography color="error">{error}</Typography>}
//       <TextField
//         label="Email"
//         variant="outlined"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         sx={{ marginBottom: 2, width: '300px' }}
//       />
//       <FormControl sx={{ marginBottom: 2, width: '300px' }} variant="outlined">
//         <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-password"
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           }
//           label="Senha"
//         />
//       </FormControl>
//       <Button variant="contained" onClick={handleLogin}>Entrar</Button>
//     </Box>
//   );
// };

// export default Login;

import axios from "axios";
import { Box, Typography, TextField, Button, OutlinedInput, Link } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import FileSelector from "../../components/UI/FileSelector/FileSelector";
import Theme from "../../theme";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [siape, setSiape] = useState("");
  const [type, setType] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState([]);
  
  const [showPassword, setShowPassWord] = useState(false);

  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);
  const handleSetName = (e) => setName(e.target.value);
  const handleSetSiape = (e) => setSiape(e.target.value);
  const handleSetConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const navigate = useNavigate()

  const handleShowPassword = () => {
    const pass = !showPassword;
    setShowPassWord(pass);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };


  const redirect = () => {
    navigate("/professores")
  }
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:3030/users", {
        email: email,
        password: password,
        name: name,
        siape: siape,
        type: type,
      })
      .then((response) => {
        redirect()
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputClasses = {
    paddingBottom: 2,
  };


    console.log(selectedFile)
  return (
    <Theme>
      {/* <CssBaseline /> */}
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
            Insira suas informações de login nos campos a baixo
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              margin: "250px auto",
            }}
            className="inputs"
          >
            
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
            <Link href="#">esqueci minha senha...</Link>
            <Button
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </Box>
        <Box sx={{ background: "#5d1c8b", height: "100vh", width: "100%" }}>
        </Box>
      </Box>
    </Theme>
  );
};

export default Register;