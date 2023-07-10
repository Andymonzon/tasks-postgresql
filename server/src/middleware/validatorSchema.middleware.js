export const validateSchema = (schema) => (req, res, next) => {
    console.log(schema)
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error)
        const errors = {}
        error.errors.forEach((error) => {
            const { path, message } = error
            errors[path] = message
        })
        return res.status(400).json({
            error: errors,
        })
    }
}
