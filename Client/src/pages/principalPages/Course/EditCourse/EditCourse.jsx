import EditPage from "../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import Theme from "../../../../theme";
// import { defaultDark } from "../../../../themes/themes";
const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({ nome: "", padrao: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  const getCourseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/cursos/" + id
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setDataOnce = async () => {
      try {
        const result = await getCourseData();
        setCourseData(result);
      } catch (err) {
        console.error(err);
      }
    };

    setDataOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "padrao") {
      if (formattedValue.length > 1) {
        return;
      } else {
        formattedValue = value.replace(/[^\d]/g, "");
      }
    } else if (name === "nome") {
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }


    try {
      setCourseData((prevState) => {
        const inputsChange = { ...prevState[0], [name]: formattedValue };
        return [inputsChange];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const saveAndRedirect = async () => {
    console.log(courseData);
    try {
      const response = await axios.put(
        "http://localhost:3030/cursos/edit/" + id,
        {
          name: courseData[0]?.nome,
          pattern: courseData[0]?.padrao,
        }
      );
      console.log(response);
      navigate("/cursos");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDeleteConfirm = async () => {
    if (password === "123") {
      try {
        const response = await axios.delete(
          `http://localhost:3030/cursos/${id}`
        );
        console.log(response);
        navigate("/cursos");
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Senha incorreta!");
    }
    setDialogOpen(false);
    setPassword("");
  };

  const handleDeleteCancel = () => {
    setDialogOpen(false);
    setPassword("");
  };

  
  return (
    <>
      <EditPage
        title="Editar Curso"
        buttonSaveFunction={saveAndRedirect}
        buttonExcludeFunction={handleDeleteClick}
        buttonExcludeName="Excluir Curso"
        returnTo="/cursos"
      >
        <Box width={"100%"} textAlign={"center"}>
          <TextField
            fullWidth
            id="courseName"
            name="nome"
            label="Nome"
            value={courseData[0]?.nome || ""}
            onChange={handleInputChange}
            margin="dense"
          />
          <Box>
            <TextField
              id="pattern"
              name="padrao"
              label="Padrão de nome de turma"
              margin="dense"
              value={courseData[0]?.padrao || ""}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Typography variant="body1" textAlign="center">
          O padrão de nome de turma segue o formato T+(número do
          período)+(número do curso), onde o último número identifica o curso
          técnico. Insira o número que corresponde ao curso!
        </Typography>
      </EditPage>

      <Theme>
        <Dialog open={dialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirmação de Exclusão</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Senha"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={handlePasswordChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} variant="contained">Cancelar</Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="error">Excluir</Button>
          </DialogActions>
        </Dialog>
      </Theme>
    </>
  );
};

export default EditCourse;
