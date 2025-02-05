import EditPage from "../../../../components/createAndEditPages/EditPage";
import ConfirmDeleteDialog from "../../../../components/UI/confirmDeleteDialog/ConfirmDeteteDialog";
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditSector = () => {
  const { id } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sectorData, setSectorData] = useState({
    name: "",
    email: "", // Mantido para exibição, mas sem campo de edição
  });

  const navigate = useNavigate();

  // Buscar dados do setor ao carregar a página
  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/setores/${id}`);
        setSectorData({
          name: response.data[0].nome || "",
          email: response.data[0].email || "", // Para uso futuro se necessário
        });
        console.log("Dados do setor carregados com sucesso:", response.data[0]);
      } catch (err) {
        console.error("Erro ao carregar os dados do setor:", err);
      }
    };

    fetchSectorData();
  }, [id]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;

    // Validação para impedir números, permitindo acentos e espaços
    if (name === "name") {
      const regex = /^[a-zA-Z\u00C0-\u017F\s]*$/;
      if (!regex.test(value)) return;
    }

    setSectorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveAndRedirect = async () => {
    try {
      await axios.put(`http://localhost:3030/setores/${id}`, {
        name: sectorData.name,
      });
      navigate("/setores");
    } catch (err) {
      console.error("Erro ao salvar o setor:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/setores/${id}`);
      navigate("/setores");
    } catch (err) {
      console.error("Erro ao deletar o setor:", err);
    }
  };

  return (
    <EditPage
      title={"Setores"}
      buttonExcludeName={"Excluir Setor"}
      returnTo={"/setores"}
      buttonExcludeFunction={setDialogOpen}
      buttonSaveFunction={saveAndRedirect}
    >
      <TextField
        id="sectorName"
        name="name"
        label="Nome do Setor"
        value={sectorData.name}
        onChange={handleInputsChange}
        fullWidth
      />

      <ConfirmDeleteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este setor?"
      />
    </EditPage>
  );
};

export default EditSector;
