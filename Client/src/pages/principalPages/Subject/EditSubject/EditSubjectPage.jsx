import EditPage from "../../../../components/createAndEditPages/EditPage";
import axios from "axios";
import ConfirmDeleteDialog from "../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Box } from "@mui/material";

const EditSubjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar o diálogo de exclusão
  const [subjectData, setSubjectData] = useState({ nome: "" }); // Alterado para um objeto
  const [errors, setErrors] = useState({ nome: "" }); // Estados de erro ajustados

  const validatedFields = () => {
    let valid = true;
    const newErrors = { nome: "" };

    if (!subjectData?.nome) {
      newErrors.nome = "O nome da disciplina é obrigatório!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/disciplina/${id}`
        );
        setSubjectData({
          nome: response.data[0].nome || "",
        });
        console.log(
          "Dados da disciplina carregados com sucesso:",
          response.data[0].nome
        );
      } catch (err) {
        console.error("Erro ao carregar os dados da disciplina:", err);
      }
    };

    fetchSectorData();
  }, [id]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "nome") {
      formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""); // Remove caracteres inválidos
    }

    try {
      setSubjectData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  const saveAndRedirect = async () => {
    if (validatedFields()) {
      await axios
        .put(`http://localhost:3030/disciplina/${id}`, {
          nome: subjectData?.nome, // Alinhado com o campo usado no backend
        })
        .then((response) => {
          console.log(response);
          navigate("/disciplinas");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/disciplina/${id}`);
      navigate("/disciplinas");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <EditPage
        title={"Disciplina"}
        buttonSaveFunction={saveAndRedirect}
        returnTo={"/disciplinas"}
        buttonExcludeName={"excluir disciplina"}
        buttonExcludeFunction={handleDeleteClick}
      >
        <Box>
          <TextField
            fullWidth
            id="subjectName"
            name="nome"
            label="Nome"
            value={subjectData?.nome || ""}
            onChange={handleInputsChange}
            margin="dense"
            error={!!errors.nome} // Corrigido para usar o campo correto
            helperText={errors.nome} // Mensagem de erro
          />
        </Box>
      </EditPage>
      <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        textAlert="este curso ( incluindo os alunos )"
      />
    </>
  );
};

export default EditSubjectPage;
