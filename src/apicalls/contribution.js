import {axiosInstance} from "./axiosInstance";

//saving info
export const SaveCalendarContribution = async(payload) =>{
    try {
        const response = await axiosInstance.post(`/api/contributions/add-contributions/${payload}`);
        
        return response.data;
    } catch (error) {
        return error.message
    }
}

// getting info
export const GetContribution = async(filters) =>{
    try {
        const response = await axiosInstance.post(`/api/contributions/get-contributions` , filters);
        return response.data;
    } catch (error) {
        return error.message
    }
}