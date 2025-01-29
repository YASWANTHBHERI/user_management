import axios from 'axios';
const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
});

export const getUsers = () => {
    return api.get("/users");
};

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

export const addUser = (user) =>{
    return api.post("/users",user);
};

export const editUser = (id,user) =>{
    return api.put(`/users/${id}`,user);
};