import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const TOKEN_KEY = process.env.TOKEN_KEY
export const DB_URL = process.env.DB_URL
export const URL_CLIENT = process.env.URL_CLIENT
