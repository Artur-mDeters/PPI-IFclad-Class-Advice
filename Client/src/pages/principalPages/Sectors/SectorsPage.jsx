import UiAppBar from "../../../components/AppBar/AppBar";
import SearchBar from "../../../components/UI/SearchBar/SearchBar";
import classes from "./Sectors.Style";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";

const getSectorData = async () => {
  const response = await axios.get('http://localhost:3030/setores')
  try {
    return response.data
  } catch (error) {
    throw new Error(error);
  }
}

const SectorsPage = () => {
  const [sectorData, setSectorData] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchDataOnce = async () => {
      try {
        const result = await getSectorData()
        setSectorData(result)
      } catch (error) {
        throw new Error(error);
      }
    }

    fetchDataOnce()
  }, [])

  const redirectToAddSectorPage = () => {
    navigate("./create")
  }
  return (

      <UiAppBar title={"Setores"}>
        <SearchBar>
          <Button variant="contained" onClick={redirectToAddSectorPage}>Adicionar Setor</Button>
        </SearchBar>
        <Box sx={classes.principalBo}>
          {sectorData.map((sector) => (
            <Paper elevation={8} key={sector.id_usuario} sx={classes.sectorPaper}>
              <Box sx={classes.typographyBox}>
                <Typography variant="h4">{sector.nome}</Typography>
              </Box>
              <Box>
                <Button variant="contained" size="large" onClick={() => navigate('./edit/'+sector.id_usuario)}>
                  Editar
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </UiAppBar>

  )
}

export default SectorsPage