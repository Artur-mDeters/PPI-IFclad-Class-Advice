import EditPage from "../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({ courseName: "", pattern: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const saveAndRedirect = async () => {
    console.log(courseData);
    try {
      const response = await axios.put(
        "http://localhost:3030/cursos/edit/" + id,
        {
          nome: courseData.courseName,
          padrao: courseData.pattern,
        }
      );
      console.log(response);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3030/cursos/${id}`);
      console.log(response);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <EditPage
      title="Editar Curso"
      buttonSaveFunction={saveAndRedirect}
      buttonExcludeFunction={handleDelete}
      buttonExcludeName="Excluir Curso"
      returnTo="/cursos"
    >
      <TextField
        id="courseName"
        label="Nome"
        value={courseData.courseName}
        onChange={handleInputChange}
      />
      <TextField
        id="pattern"
        label="Padrão de nome de turma"
        value={courseData.pattern}
        onChange={handleInputChange}
      />
      <Typography variant="body1" textAlign="center">
        O padrão de nome de turma segue o formato T+(número do período)+(número
        do curso), onde o último número identifica o curso técnico. Insira o
        número que corresponde ao curso!
      </Typography>
    </EditPage>
  );
};

export default EditCourse;
