import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../config.js'

export const validateToken = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, TOKEN_KEY, (err, decode) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })
        req.user = decode
        next()
    })
}
