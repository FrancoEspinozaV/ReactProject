import mongoose from 'mongoose'

const urlBD = `mongodb://localhost/merndb`

export async function connectDB() {
  try {
    await mongoose.connect(urlBD)
  } catch (err) {
    console.log(err)
  }
}
