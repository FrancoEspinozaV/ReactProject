import jwt from 'jsonwebtoken'
import { TOKEN_SECRETE } from '../config.js'

export function authRequired(req, res, next) {
  const { token } = req.cookies
  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' })

  jwt.verify(token, TOKEN_SECRETE, (err, decode) => {
    if (err) return res.status(403).json({ message: 'invalid token' })
    req.id = decode.id
    next()
  })
}
