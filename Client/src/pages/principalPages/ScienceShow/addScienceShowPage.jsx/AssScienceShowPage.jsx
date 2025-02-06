import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
} from "@mui/material";
import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getSubjectsData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/allStudents"); // Ajuste a URL para disciplinas
    console.log(response);
    return response.data; // Retorna apenas os dados
  } catch (err) {
    console.error("Erro ao buscar disciplinas:", err);
    return [];
  }
};

const AddScienceShowPage = () => {
  const [studentList, setStudentList] = useState([]); // Lista de disciplinas
  const [selectedStudent, setSelectedStudents] = useState([]); // IDs das disciplinas selecionadas
  const [projectname, setProjectname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubjectsData();
      setStudentList(data);
    };

    fetchData();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedStudents(event.target.value);
  };

  const saveAndRedirect = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/addGrupoMostra/",
        {
          nome: projectname,
          students: studentList,
        }
      );
      console.log(response.data);

      // Limpar dados e redirecionar após o sucesso
      setProjectname(""); // Limpa os dados da turma
      setStudentList([]); // Limpa os dados do curso

      navigate("/mostra"); // Redireciona para a página de turmas
    } catch (err) {
      console.error("Erro ao salvar a turma:", err);
    }
  };

  return (
    <CreatePage Title={"Grupo"} buttonSaveFunction={saveAndRedirect}>
      <TextField
        value={projectname}
        onChange={(e) => setProjectname(e.target.value)}
        variant="outlined"
        label="Nome do Projeto"
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="subject-label">Alunos</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          name="subject"
          multiple
          value={selectedStudent} // Lista de IDs selecionados
          onChange={handleSubjectChange} // Atualiza o estado ao selecionar
          renderValue={(selected) =>
            studentList
              .filter((subject) => selected.includes(subject.id_aluno))
              .map((subject) => subject.nome)
              .join(", ")
          }
        >
          {studentList.map((subject) => (
            <MenuItem key={subject.id_aluno} value={subject.id_aluno}>
              <Checkbox checked={selectedStudent.includes(subject.id_aluno)} />
              <ListItemText primary={subject.nome} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CreatePage>
  );
};

export default AddScienceShowPage;
