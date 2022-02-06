import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})
