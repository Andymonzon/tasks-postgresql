import { pool } from '../db.js'

export const getTasks = async (req, res) => {
    const { id } = req.user
    try {
        const { rows } = await pool.query(
            'SELECT * FROM tareas WHERE user_id = $1 ORDER BY id ASC',
            [id]
        )
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const getTask = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    try {
        const { rows } = await pool.query(
            'SELECT * FROM tareas WHERE id = $1 AND user_id = $2',
            [id, userId]
        )
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const createTask = async (req, res) => {
    const { description } = req.body
    const { id } = req.user
    if (!description)
        return res.status(400).json({ msg: 'Complete los campos' })
    try {
        const { rows } = await pool.query(
            'INSERT INTO tareas (description, user_id) VALUES($1, $2) RETURNING *',
            [description, id]
        )
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    const { description, completed } = req.body
    try {
        const { rows } = await pool.query(
            'UPDATE tareas SET description = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [description, completed, id, userId]
        )
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM tareas WHERE id = $1 AND user_id = $2',
            [id, userId]
        )
        if (!rowCount)
            return res.status(404).json({ msg: 'Tarea no encontrada' })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
