import jwt from "jsonwebtoken"

import { UserInterface } from "../../../Interfaces"
import { RequestHandler } from "express"
const JWT_SECRET = process.env.JWT_SECRET as string

const users: UserInterface[] = [
  {
    id: "1",
    email: "user@example.com",
    firstName: "John",
    password: "password123",
  },
]

const SignUp: RequestHandler = async (req, res) => {
  const { email, password, firstName } = req.body

  if (users.some((u) => u.email === email)) {
    res.status(400).json({ message: "User already exists" })
    return
  }

  const newUser: UserInterface = {
    id: String(users.length + 1),
    email,
    password,
    firstName,
  }

  users.push(newUser)

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, firstName: newUser.firstName },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.status(201).json({ token })
}

export default SignUp
