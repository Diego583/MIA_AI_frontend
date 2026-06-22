import { post, get, put, del } from "./axios";

export async function getChatMessages(sessionId: string, page: number | null = null, limit: number | null = null, accessToken: string | null = null): Promise<any> {
    const actualPage = page ?? 1;
    const actualLimit = limit ?? 50;
    const { data } = await get(`/chat/${sessionId}?page=${actualPage}&limit=${actualLimit}`, accessToken);
    return data;
}

export async function getChatHistory(accessToken: string | null = null): Promise<any> {
    const { data } = await get(`/chat/history`, accessToken);
    return data;
}

export async function getActiveConversation(accessToken: string | null = null): Promise<any> {
    const { data } = await get(`/chat/history`, accessToken);
    return data;
}

export async function sendMessage(content: string, sessionId?: string, accessToken: string | null = null): Promise<any> {
    const { data } = await post(`/chat/message`, { content, sessionId }, accessToken);
    return data;
}

export async function createNewConversation(accessToken: string | null = null): Promise<any> {
    const { data } = await post(`/chat/conversation`, {}, accessToken);
    return data;
}
