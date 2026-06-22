import { API_BASE_URL } from "@/constants/core";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 60000,
    withCredentials: true,   // send the httpOnly refresh cookie
    headers: { "Content-Type": "application/json" },
});

const getAuthHeaders = async (accessToken: string | null) => {
    if (!accessToken) {
        return {
            "Content-Type": "application/json",
        };
    }
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    };
};

export const post = async (url: any, data: any, accessToken: string | null) => {
    const headers = await getAuthHeaders(accessToken);
    return await axiosInstance.post(url, data, { headers });
};

export const get = async (url: any, accessToken: string | null) => {
    const headers = await getAuthHeaders(accessToken);
    return await axiosInstance.get(url, { headers });
};

export const put = async (url: any, data: any, accessToken: string | null) => {
    const headers = await getAuthHeaders(accessToken);
    return await axiosInstance.put(url, data, { headers });
};

export const del = async (url: any, accessToken: string | null) => {
    const headers = await getAuthHeaders(accessToken);
    return await axiosInstance.delete(url, { headers });
};
