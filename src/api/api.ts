import axios from "axios";
import { serverURI } from "./config";
const api = axios.create({
	baseURL: serverURI,
});

export const get = async (url: string, options?: any) =>{
    return api.get(url, options);
}

export const post = async (url: string,payload: any, options?: any) =>{
    return api.post(url, payload ,options);
}

export const patch = async (url: string, payload: any, options?: any) =>{
    return api.patch(url, payload, options);
}

export const remove = async (url: string, options?: any) =>{
    return api.delete(url ,options);
}

// api.interceptors.request.use((req) => {
// 	return {
// 		...req,
// 		baseURL: apiConfig.serverURI,
// 	};
// });