import { getBaseUrl } from "@/utils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.MODE === "development" ? '/api' : `${getBaseUrl()}/api`,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    ...(import.meta.env.MODE === "development" && {
      Authorization: `Bearer ${import.meta.env.VITE_DATAROBOT_API_TOKEN}`,
    }),
  },
  withCredentials: true,
});
export default apiClient;

const drClient = axios.create({
  baseURL: import.meta.env.MODE === "development" ? '/api/v2' : `${window.location.origin}/api/v2`,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export { drClient, apiClient };