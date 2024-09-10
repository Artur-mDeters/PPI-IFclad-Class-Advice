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
    email: "",
  });

  const navigate = useNavigate();

//   Fetch sector data when component mounts
  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/setores/${id}`);
        setSectorData({
          name: response.data.name || "",
        });
      } catch (err) {
        console.error("Erro ao carregar os dados do setor:", err);
      }
    };

    fetchSectorData();
  }, [id]);

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
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

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  // Optional: Add a function to handle delete confirmation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/setores/${id}`);
      navigate("/setores");
    } catch (err) {
      console.error("Erro ao excluir o setor:", err);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <EditPage
        title={"Setores"}
        buttonExcludeName={"Excluir Setor"}
        returnTo={"/setores"}
        buttonExcludeFunction={handleDeleteClick}
        buttonSaveFunction={saveAndRedirect}
      >
        <TextField
          id="sectorName"
          name="name"
          label="Nome do Setor"
          value={sectorData.name}
          onChange={handleInputsChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="sectorEmail"
          name="email"
          label="Email do Setor"
          value={sectorData.email}
          onChange={handleInputsChange}
          disabled
          fullWidth
          margin="normal"
        />
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

export default EditSector;
