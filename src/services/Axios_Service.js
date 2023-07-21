import axios from "axios";
import { BASE_URL } from "./Helper_Service";
import { getTokenFromLocalStorage } from "../auth/Helper.auth";

export const publicAxios=axios.create({
    baseURL:BASE_URL
})

export const privateAxios=axios.create({
    baseURL:BASE_URL
})

//Token lekr header me bhejna h

privateAxios.interceptors.request.use(
    (config)=>{
    //Request me modification krna pdega
        const token=getTokenFromLocalStorage();
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>Promise.reject(error)
)


