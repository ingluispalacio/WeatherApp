import axios from "axios";
import  configEnv  from "./config";

const client = axios.create({
  baseURL: configEnv.apiBase ,
  timeout: 8000,
});

client.interceptors.request.use(
  (config) => {
    config.url = config.url || "";
    
    const separator = config.url.includes("?") ? "&" : "?";
    let queryUnit = '';
    if(configEnv.apiUnit){
      queryUnit =`&units=${configEnv.apiUnit}`;
    }
    config.url = `${config.url}${separator}appid=${configEnv.apiKey}${queryUnit}`;
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;