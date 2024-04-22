import React from "react";
import {
  Box,
  Button,
  TextField,
  Divider, Typography, Paper
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search'
import turmas from './Turmas.json'

// ! Styles #########################

const principalBox = {
  color: "#fff",
};

const navBox = {
  display: "flex",
  alignItems: 'center',
  marginBottom: '15px'
};

const boxTurmas = {
  display: "flex",
  gap: "10px",
  flexWrap: 'wrap'
}

const Turmas = () => {
  return (
    <Box sx={principalBox}>
      
      <Box component="nav" sx={navBox}>
        <Box flex={1}>
          <Button variant="contained" sx={{marginRight: '15px'}}>Adicionar Turma</Button>
          <Button variant="contained">Definir Conselho</Button>
        </Box>
        <Box>
        <TextField
        id="campo-busca"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          ),
        }}
      />
        </Box>
        
      </Box>
      <Divider />
      <Box sx={boxTurmas}>
        {turmas.map(turma => (
          <Paper key={turma.id} elevation={8} sx={{display: 'flex', width: '250px', height: '140px', margin: '15px', padding: '20px' }}>
            <Box sx={{flex: 1}}>
              <Typography variant="h4" mb={5}>
                {turma.turma}
              </Typography>
              <Typography variant="body1">
                {turma.aluno} Alunos
              </Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "space-between", height: '100%'}}>
              <Button variant="contained">Editar</Button>
              <Button variant="contained">Notas</Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Turmas;
