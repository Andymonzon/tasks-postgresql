import { pool } from '../db.js'
import bcrypt from 'bcryptjs'
import { createToken } from '../lib/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../config.js'

export const registerAuth = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const userFound = await pool.query(
            'SELECT email  FROM usuarios WHERE email = $1',
            [email]
        )

        if (userFound.rows.length > 0)
            return res.status(400).json({ msg: 'El usuario ya existe' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const { rows } = await pool.query(
            'INSERT INTO usuarios (name, email, password) VALUES( $1, $2, $3 ) RETURNING *',
            [userName, email, hashedPassword]
        )

        const token = await createToken({ id: rows[0].id })

        res.cookie('token', token)

        res.json({
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const loginAuth = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        )

        if (userFound.rows.length === 0)
            return res.status(400).json({ msg: 'Usuario no encontrado' })

        const validPassword = await bcrypt.compare(
            password,
            userFound.rows[0].password
        )

        if (!validPassword)
            return res.status(400).json({ msg: 'Contraseña incorrecta' })

        const token = await createToken({ id: userFound.rows[0].id })

        res.cookie('token', token)

        res.json({
            id: userFound.rows[0].id,
            name: userFound.rows[0].name,
            email: userFound.rows[0].email,
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    return res.sendStatus(200)
}

export const verifyToken = (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ msg: 'No hay token' })

    jwt.verify(token, TOKEN_KEY, async (err, user) => {
        try {
            if (err) return res.status(401).json({ msg: 'Token no valido' })

            const { rows } = await pool.query(
                'SELECT * FROM usuarios WHERE id = $1',
                [user.id]
            )

            if (rows.length === 0)
                return res.status(401).json({ msg: 'Token no valido' })

            res.json({
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    })
}
