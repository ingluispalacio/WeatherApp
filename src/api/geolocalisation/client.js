import axios from "axios";
import configEnv from "./config";

const clientIpinfo = axios.create({
  baseURL: configEnv.ipinfo.apiBase, 
  timeout: 8000,
});

clientIpinfo.interceptors.request.use(
  (config) => {
    config.url = config.url || "";
    
    const separator = config.url.includes("?") ? "&" : "?";
    config.url = `${config.url}${separator}token=${configEnv.ipinfo.apiToken}`;
    
    return config;
  },
  (error) => Promise.reject(error)
);

const clientIpify = axios.create({
  baseURL: configEnv.ipify.apiBase,
  timeout: 8000,
});

const clientIpinfoDetail = axios.create({
  baseURL: configEnv.ipinfoDetail.apiBase,
  timeout: 8000,
});

export { clientIpify, clientIpinfo, clientIpinfoDetail };
