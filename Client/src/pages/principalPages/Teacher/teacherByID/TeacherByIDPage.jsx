import { Box, TextField } from "@mui/material";
import AppBar from "../../../../components/AppBar/AppBar";
import img from "../img/fotos/padrao.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TeacherByIDPage = () => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState([]);

  const getTeacherData = async () => {
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
    const setDataOnce = async () => {
      try {
        const result = await getTeacherData();
        setTeacherData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTeacherData((prevState) => {
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
            id="name"
            label="Nome"
            value={teacherData[0]?.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            id="email"
            label="Email"
            value={teacherData[0]?.email || ""}
            // onChange={handleInputChange}
          />

          <TextField
            id="bio"
            label="Bio (informações adicionais)"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={teacherData[0]?.bio}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
    </AppBar>
  );
};

export default TeacherByIDPage;
