import Theme from "../../../../theme";
import { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Divider,
} from "@mui/material";
import "./PDFgrades.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const getAllGradesByStudents = async (idTurma) => {
  const data = await axios.get(
    `http://localhost:3030/notasCalculadas/${idTurma}`
  );
  return data.data;
};

const getAllStudents = async (idTurma) => {
  const data = await axios.get(`http://localhost:3030/${idTurma}/alunos`);
  return data;
};

const PDFgrades = () => {
  const idTurma = useParams().idTurma;
  const [selectedOption, setSelectedOption] = useState("");
  const [allGradesAndNames, setAllGradesAndNames] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        const existingGrades = await getAllGradesByStudents(idTurma);
        const existingStudents = await getAllStudents(idTurma);
        setAllGradesAndNames(existingGrades);
        setAllStudents(existingStudents);
      } catch (error) {
        console.error("Erro ao buscar as notas:", error);
      }
    };

    fetchGradesData();
  }, [idTurma]);


  return (
    <Theme>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-label">Selecione</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleChange}
            label="Selecione"
          >
            <MenuItem value="parcial1">Parcial 1</MenuItem>
            <MenuItem value="primeiroSemestre">Primeiro Semestre</MenuItem>
            <MenuItem value="parcial2">Parcial 2</MenuItem>
            <MenuItem value="segundoSemestre">Segundo Semestre</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Button variant="contained">Baixar</Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {/* Renderizando a tabela com base nas notas filtradas */}
        {allStudents.map((student) => (
          // eslint-disable-next-line react/jsx-key
          <div className="content" color="black" display="flex" style={{ flexDirection: "column" }}>
            <div>Titulo</div>
            <div>Texto inicial</div>
            <div>
              Notas de {student.nome}
              <table border={1}>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Parcial 1</th>
                    <th>Primeiro Semestre</th>
                    <th>Parcial 2</th>
                    <th>Segundo Semestre</th>
                  </tr>
                </thead>
                <tbody>
                  {allGradesAndNames.map((grade) => (
                    <tr key={grade.fk_aluno_id_aluno}>
                      <td>{grade.disciplina}</td>
                      <td>{grade.pars_primeiro_sem}</td>
                      <td>{grade.nota_primeiro_sem}</td>
                      <td>{grade.pars_segundo_sem}</td>
                      <td>{grade.nota_final_nf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Box>
    </Theme>
  );
};

export default PDFgrades;
