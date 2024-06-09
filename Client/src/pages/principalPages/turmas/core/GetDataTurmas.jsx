import axios from "axios";

const getDataTurmas = async () => {
    const response = await axios.get("http://localhost:3030/turmas");
    try {
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

export default getDataTurmas