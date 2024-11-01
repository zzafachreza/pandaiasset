import axios from "axios";
import { apiURL } from "../localStorage";

export const getDataCompany = async () => {
    return await axios.get(apiURL + 'company');
};


export const getDataByTable = async (endpoint) => {
    return await axios.get(apiURL + endpoint);
};


export const POSTDataByTable = async (endpoint, data) => {
    return await axios.post(apiURL + endpoint, data);
};