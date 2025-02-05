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
import { jsPDF } from "jspdf"; // Importa o jsPDF
import html2canvas from "html2canvas";
import classes from "./PDFgrades.style";

const getAllGradesByStudents = async (idTurma) => {
  const data = await axios.get(
    `http://localhost:3030/notasCalculadas/${idTurma}`
  );
  
  return data.data;
};

const getAllStudents = async (idTurma) => {
  const data = await axios.get(`http://localhost:3030/${idTurma}/alunos`);
  return data.data;
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

   // Importa a biblioteca html2canvas

const downloadPDF = () => {
  const doc = new jsPDF();

  const contentElements = document.getElementsByClassName("content");
  const totalPages = contentElements.length;

  Array.from(contentElements).forEach((content, index) => {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10, 190, 0); // Ajuste a largura e altura conforme necessário

      if (index < totalPages - 1) {
        doc.addPage(); // Adiciona uma nova página se não for o último elemento
      }

      // Salva o PDF apenas quando o último conteúdo for adicionado
      if (index === totalPages - 1) {
        doc.save("Notas.pdf");
      }
    });
  });
};

  return (
    <Theme>
      <Box
        sx={classes.box_Theme}
      >
        <FormControl sx={classes.formControl}>
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
          <Button variant="contained" onClick={downloadPDF}>Baixar</Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={classes.box_Divider}
      >
        {/* Atribua uma classe para a div que contém o conteúdo que você quer exportar */}
        {allStudents.map((student) => (
          <div className="content" style={classes.div_Content} key={student.id_aluno}>
            <div>Notas de {student.nome}</div>
            <table border={1}>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Parcial 1</th>
                  <th>Primeiro Semestre</th>
                  <th>Parcial 2</th>
                  <th>Segundo Semestre</th>
                  <th>Faltas</th>
                </tr>
              </thead>
              <tbody>
                {allGradesAndNames.map((grade) => (
                  <tr key={grade.fk_aluno_id_aluno}>
                    <td>{grade.disciplina}</td>
                    <td>{grade.pars_primeiro_sem}</td>
                    <td>{grade.nota_primeiro_semestre_calculada}</td>
                    <td>{grade.pars_segundo_sem}</td>
                    <td>{grade.nota_final_nf}</td>
                    <td>{grade.faltas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </Box>
    </Theme>
  );
};

export default PDFgrades;
