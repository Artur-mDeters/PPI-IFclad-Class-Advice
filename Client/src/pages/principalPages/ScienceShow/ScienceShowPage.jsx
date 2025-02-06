import UiAppBar from "../../../components/AppBar/AppBar";
import { Box, Button, Paper, Typography } from "@mui/material";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flare } from "@mui/icons-material";

const getMostra = async () => {
  const response = await axios.get("http://localhost:3030/mostra");
  console.log(response.data);
  return response.data;
};

const ScienceShowPage = () => {
  const [mostra, setMostra] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMostra();
      setMostra(data);
    };

    fetchData();
  }, []);

  console.log(mostra);

  return (
    <UiAppBar title={"Mostra de Ciências"}>
      <SearchBar>
        <Button variant="contained" onClick={() => navigate("/addGrupoMostra")}>
          Adicionar Grupo
        </Button>
      </SearchBar>
      <Box>
        {mostra.map((grupo) => (
          <Paper elevation={5} key={grupo.id} sx={{width: "100%", height: '130px', margin: '10px', display: 'flex', alignItems: "center", justifyContent: "center", padding: '0 100px'}}>
            
            <Box sx={{flex: 1}}>
            <Typography variant="h4">{grupo.nome}</Typography>
            </Box>
            <Button variant="contained">Editar</Button>
          </Paper>
        ))}
      </Box>
    </UiAppBar>
  );
};

export default ScienceShowPage;