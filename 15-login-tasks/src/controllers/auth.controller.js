import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createToke } from '../libs/jwt.js'

export async function register(req, res) {
  const { username, password, email } = req.body

  try {
    const passwordCrypt = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      password: passwordCrypt,
      email,
    })

    const userSave = await newUser.save()

    const token = await createToke({ id: userSave._id })
    res.cookie('token', token)

    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      createAt: userSave.createdAt,
      updateAt: userSave.updatedAt,
    })
  } catch (error) {
    console.log(error)
    res.send('usuario no registrado')
    res.status(500).json({ message: error.message })
  }
}

export async function login(req, res) {
  const { password, email } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: 'user not found' })

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if (!isValidPassword)
      return res.status(400).json({ message: 'error password' })

    const token = await createToke({ id: userFound._id })
    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    })
  } catch (error) {
    console.log(error)
    res.send('Error al iniciar')
    res.status(500).json({ message: error.message })
  }
}

export function logout(req, res) {
  res.cookie('token', '', { expires: new Date(0) })
  return res.status(200)
}

export async function profile(req, res) {
  const userFound = await User.findById(req.id)
  if (!userFound) return res.status(400).json({ message: 'user not found' })

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  })
}
