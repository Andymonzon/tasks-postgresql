import pg from 'pg'
import { DB_URL } from './config.js'

const pool = new pg.Pool({
    connectionString: DB_URL,
})

export { pool }
