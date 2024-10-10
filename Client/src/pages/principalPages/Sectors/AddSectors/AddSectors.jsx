import CreatePage from "../../../../components/createAndEditPages/CreatePage";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";


const AddSectors = () => {
  const [sectorData, setSectorData] = useState({ name: "", email: "" });
  const navigate = useNavigate()

    const handleInputsChange = (e) => {
      const { name, value } = e.target;
      setSectorData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const saveAndRedirect = async () => {
      try {
        await axios.post("http://localhost:3030/setores", {
          name: sectorData.name,
          email: sectorData.email, 
        });
        navigate("/setores");
      } catch (err) {
        console.error("Erro ao salvar o professor:", err);
      }
    };

  return (
    <CreatePage Title="Setor" buttonSaveFunction={saveAndRedirect} returnTo={"/setores"}>
      <TextField
        id="sectorName"
        name="name"
        label="Nome do Setor"
        value={sectorData.nome}
        onChange={handleInputsChange}
      />
      <TextField
        id="sectorEmail"
        name="email"
        label="Email do Setor"
        value={sectorData.email}
        onChange={handleInputsChange}
      />
    </CreatePage>
  );
};

export default AddSectors;
