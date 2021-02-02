import axios from "axios";

const axiosConfig = {
  // baseURL: "https://skribbl-lists-serverless.now.sh/api/budgetItems/",
  // baseURL:"https://skribbl-lists-serverless.ric-lavers.vercel.app/api/budgetItems/",
  baseURL: "http://localhost:3000/api/budgetItems/",
  redirect: "follow",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  data: {},
};

const Axios = axios.create(axiosConfig);
Axios.interceptors.response.use((res) => res.data);

export default Axios;
