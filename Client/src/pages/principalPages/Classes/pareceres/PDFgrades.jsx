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
    console.log(allGradesAndNames);

    fetchGradesData();
  }, [idTurma]);

  // Importa a biblioteca html2canvas

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // Garante o formato A4
    const contentElements = document.getElementsByClassName("content");
    const totalPages = contentElements.length;
  
    Array.from(contentElements).forEach((content, index) => {
      html2canvas(content, {
        scale: 3, // Aumenta a resolução da renderização
        useCORS: true, // Para garantir que fontes e imagens externas funcionem bem
        allowTaint: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        const imgWidth = 190; // Largura do conteúdo no A4
        // const pageHeight = 287; // Altura da página A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        let position = 10;
  
        doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  
        if (index < totalPages - 1) {
          doc.addPage();
        }
  
        if (index === totalPages - 1) {
          doc.save("Notas.pdf");
        }
      });
    });
  };
  
  

  return (
    <Theme>
      <Box sx={classes.box_Theme}>
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
          <Button variant="contained" onClick={downloadPDF}>
            Baixar
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={classes.box_Divider}>
        {/* Atribua uma classe para a div que contém o conteúdo que você quer exportar */}
        <div className="container">
          {allStudents.map((student) => (
            <div
              className="content"
              style={classes.div_Content}
              key={student.id_aluno}
            >
              <div>Instituto Federal Farroupilha - campus Frederico Westphalen</div>
              <div>Nome do Estudante: {student.nome}</div>
              <div>Matrícula: {student.matricula}</div>
              <div></div>
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
                  {allGradesAndNames
                    .filter(
                      (grade) => grade.id_aluno === student.id_aluno
                    )
                    .map((grade) => (
                      <tr key={grade.id_aluno + grade.disciplina}>
                        <td>{grade.disciplina}</td>
                        <td>{grade.parcial1}</td>
                        <td>{grade.semestre1}</td>
                        <td>{grade.parcial2}</td>
                        <td>{grade.semestre2}</td>
                        <td>{grade.faltas}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Box>
    </Theme>
  );
};

export default PDFgrades;
