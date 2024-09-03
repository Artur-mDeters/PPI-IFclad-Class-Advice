import { Box, Typography, TextField } from "@mui/material";
import AppBar from "../../../../components/AppBar/AppBar";
// import Theme from "../../../../theme"
// import SearchBar from "../../../../components/UI/SearchBar/SearchBar"
import img from "../img/fotos/padrao.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Professor = () => {
  const { id } = useParams();
  const [dataProfessor, setDataProfessor] = useState([]);

  const getDataProfessor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/professores/" + id
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataProfessor();
        setDataProfessor(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    console.log(dataProfessor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDataProfessor((prevState) => {
      const updateProfessor = { ...prevState[0], [id]: value };
      return [updateProfessor];
    });
  };

  return (
    <AppBar>
      <Box>
        <Box>
          <img src={img} alt="deu pau" />
        </Box>
        <Box>
          <TextField
            id="nome"
            label="Nome"
            value={dataProfessor[0]?.nome || ""}
            onChange={handleInputChange}
          />
          <TextField
            id="email"
            label="Email"
            value={dataProfessor[0]?.email || ""}
            // onChange={handleInputChange}
          />

          <TextField
            id="bio"
            label="Bio (informações adicionais)"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={dataProfessor[0]?.bio}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

export default Professor;
