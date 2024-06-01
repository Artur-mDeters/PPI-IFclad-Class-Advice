import axios from "axios"


const handleSubmit = async (email, pass) => {
    const userRef = {
        email,
        pass
    }
    await axios.post("http://localhost:3030/login", userRef).then((response) => {
        return response
    }).catch((err) => {
        console.error(err)
    })
  }

export default handleSubmit