import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // ajuste se necessário
});

// Para adicionar o token JWT depois do login
export const setToken = (token: string) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Endpoints de exemplo
export const getMotos = () => API.get("/motos");
export const createMoto = (data: any) => API.post("/motos", data);
export const updateMoto = (id: string, data: any) => API.put(`/motos/${id}`, data);
export const deleteMoto = (id: string) => API.delete(`/motos/${id}`);
