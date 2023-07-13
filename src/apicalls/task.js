import { axiosInstance } from "./axiosInstance";

// add new task

export const AddTask = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/users/add-todo", payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

// get all task

export const GetAllTask = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/users/get-all-todo" , filters);
        return response.data;
    } catch (error) {
        return error.message
    }
}

// delete task

export const DeleteTask = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/users/delete-todo/${id}`);
        return response.data;
    } catch (error) {
        return error.message
    }
}

// update task

export const UpdateTask = async (id) => {
    try {
        const response = await axiosInstance.put(`/api/users/update-todo/${id}`);
        return response.data;
    } catch (error) {
        return error.message
    }
}

