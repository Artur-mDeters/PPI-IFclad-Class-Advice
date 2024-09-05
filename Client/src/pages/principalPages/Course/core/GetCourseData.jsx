import axios from "axios";

const getCourseData = async () => {
    const response = await axios.get("http://localhost:3030/cursos");
    try {
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

export default getCourseData