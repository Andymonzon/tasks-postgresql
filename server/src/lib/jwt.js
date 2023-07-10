import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../config.js'

export const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_KEY, { expiresIn: '7d' }, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    })
}
