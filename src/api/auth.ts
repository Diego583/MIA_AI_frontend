import { post, get, put } from "./axios";

export async function updateUser(userInfo: any, accessToken: string | null = null) {
    const { data } = await put(`/user/profile`, userInfo, accessToken);
    return data;
}

export async function getUserById(accessToken: string | null = null) {
    const { data } = await get(`/user/profile`, accessToken);
    return data;
}