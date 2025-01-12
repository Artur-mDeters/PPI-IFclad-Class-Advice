import EditPage from "../../../../components/createAndEditPages/EditPage";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDeleteDialog from "../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

// Função para obter os dados das disciplinas do servidor
const getSubjectsData = async () => {
  try {
    const response = await axios.get("http://localhost:3030/disciplina/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw error;
  }
};

// Função para obter os dados do professor do servidor
const getTeacherData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3030/professores/${id}`);
    return response.data[0];
  } catch (error) {
    console.error("Erro ao buscar dados do professor:", error);
    throw error;
  }
};

const EditTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do professor da URL
  const [subjectsData, setSubjectsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: "",
    bio: "",
    subjects: [], // Armazena apenas IDs das disciplinas
  });

  // Efeito para buscar as disciplinas e dados do professor quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsResponse, teacherResponse] = await Promise.all([
          getSubjectsData(),
          getTeacherData(id),
        ]);
        setSubjectsData(subjectsResponse);
        setTeacherData({
          name: teacherResponse.nome || "",
          bio: teacherResponse.bio || "",
          subjects: teacherResponse.id_disciplina || [], // IDs das disciplinas
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchData();
  }, [id]);
  
  // Acompanhar a mudança de subjectsData
  useEffect(() => {
    console.log(subjectsData, "disciplinas");
  }, [subjectsData]);
  

  // Função para lidar com a mudança nos inputs de texto
  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança no Select de disciplinas
  const handleSubjectsChange = (e) => {
    const { value } = e.target;
    setTeacherData((prevState) => ({
      ...prevState,
      subjects: value, // Atualiza os IDs selecionados
    }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/professores/${id}`);
      navigate("/professores");
    } catch (err) {
      console.error("Erro ao excluir o professor:", err);
    }
    setDialogOpen(false);
  };

  const saveAndRedirect = async () => {
    try {
      await axios.put(`http://localhost:3030/professores/${id}`, {
        name: teacherData.name,
        bio: teacherData.bio, // Enviar a bio, se estiver presente
        subjects: teacherData.subjects, // Apenas os IDs das disciplinas são enviados
      });
      navigate("/professores");
    } catch (err) {
      console.error("Erro ao salvar o professor:", err);
    }
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <EditPage
        title={"Docente"}
        buttonSaveFunction={saveAndRedirect}
        returnTo={"/professores"}
        buttonExcludeFunction={handleDeleteClick}
        buttonExcludeName='excluir docente'
      >
        <TextField
          id="teacherName"
          name="name"
          label="Nome do Docente"
          value={teacherData.name}
          onChange={handleInputsChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="teacherBio"
          name="bio"
          label="Informações Adicionais (bio)"
          value={teacherData.bio}
          onChange={handleInputsChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth>
        <InputLabel id="subjects">Disciplinas</InputLabel>
        <Select
          labelId="subjects"
          label="Disciplinas"
          id="subjects"
          name="subjects"
          multiple
          value={teacherData.subjects} // Array de IDs selecionados
          onChange={handleSubjectsChange}
          renderValue={(selected) =>
            subjectsData
              .filter((subject) => selected.includes(subject.id_disciplina))
              .map((subject) => subject.nome)
              .join(", ")
          }
        >
          {subjectsData.map((option) => (
            <MenuItem key={option.id_disciplina} value={option.id_disciplina}>
              <Checkbox
                checked={teacherData.subjects.includes(option.id_disciplina)}
              />
              <ListItemText primary={option.nome} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </EditPage>
      <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        textAlert="Este setor (incluindo os dados associados) será excluído."
      />
    </>
  );
};

export default EditTeacher;
