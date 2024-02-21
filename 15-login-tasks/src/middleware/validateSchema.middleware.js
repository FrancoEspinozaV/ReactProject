export function validateSchema(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      const { errors } = error
      const messageError = errors.map((err) => err.message)
      console.log(messageError)
      return res.status(400).json({ error: messageError })
    }
  }
}
