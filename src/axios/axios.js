import axios from "axios";

// Criação da instância do axios
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
  getUsers: () => api.get("user"),

  postLogin: (user) => api.post("login/", user),

  deleteUser: (id_usuario) => api.delete(`user/${id_usuario}`),

  getEventos: () => api.get("evento"),

  deleteEvent: (id_evento) => api.delete(`evento/${id_evento}`),
  createIngresso: (ingresso) => api.post("/ing", ingresso),
};

export default sheets;
