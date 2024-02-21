import { TOKEN_SECRETE } from '../config.js'
import jwt from 'jsonwebtoken'
export function createToke(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRETE,
      {
        expiresIn: '1d',
      },
      (error, token) => {
        if (error) {
          reject(error)
          return
        }
        resolve(token)
      }
    )
  })
}
