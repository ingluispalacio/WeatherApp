import axios from "axios";

const client = axios.create({
  baseURL: 'weatherapp/static_Json' ,
  timeout: 8000,
});

export default client;