import axios from "axios";

export const api = axios.create({
    baseURL: "https://authenticity-hackathon.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});
