import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getHabits = () => api.get("/books");
export const addHabit = (habit) => api.post("/books", habit);
export const updateHabit = (id, habit) => api.put(`/books/${id}`, habit);
export const deleteHabit = (id) => api.delete(`/books/${id}`);

export default api;