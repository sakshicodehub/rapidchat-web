import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
 console.log("token from api.ts", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // remove expired/invalid token
      localStorage.removeItem("token");

      // send user to login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export const getMessages = (chat_id: string) => API.get("/messages", { params: { chat_id } });

export const sendMessage = (data: { content: string, chat_id: string, sent_at: Date }) =>
  API.post("/messages", data);

export const login = (data: { username: string; password: string }) =>
  API.post("/auth/login", data);

export const sendOtp = (data: { phone: string }) =>
  API.post("/auth/send_otp", data);

export const verifyOtp = (data: { phone: string; otp: string }) =>
  API.post("/auth/verify_otp", data);

export const getchatlist = () => API.get("/chats");

export const getcontactlist = () => API.get("/contacts")

export const createChat = (data: {chat: {phone: string, chat_type: string}}) => API.post("/chats", data)

export const showChat = (chat_id: string) => {  return API.get(`/chats/${chat_id}`);
};
export const createContact = (data: {contact: {nickname: string, phone: string}}) => API.post("/contacts", data)  