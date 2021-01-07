import axios from 'axios';


const base_url = "http://localhost:3001/api/register";

const registerAccount = async (username: string, email: string, password: string) => {
    return await axios.post(`${base_url}/`, {
        username,
        email,
        password
    }, {
        headers: {
            "Content-type": "application/json"
        }
    });
}

export default { registerAccount };