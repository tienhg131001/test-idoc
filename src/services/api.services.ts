import axios from "axios";

const instace = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

export default instace;
