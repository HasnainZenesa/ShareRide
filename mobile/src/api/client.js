import axios from "axios";
// REAL PHONE: http://YOUR_LAN_IP:4000   | ANDROID EMULATOR: http://10.0.2.2:4000
const BASE_URL = "http://10.0.2.2:4000"; // update when integrating backend
export const api = axios.create({ baseURL: BASE_URL, timeout: 15000 });
