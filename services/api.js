import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
 baseURL: process.env.EXPO_PUBLIC_API_URL || "https://smartnudge-k4rg.onrender.com",
  timeout: 30000,
});

// 🔥 ATTACH TOKEN AUTOMATICALLY
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;