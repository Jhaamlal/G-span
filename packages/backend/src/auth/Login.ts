import "dotenv/config"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { UserInterface } from "../../../Interfaces"

const JWT_SECRET = process.env.JWT_SECRET as string

// one data that is been done,
const users: UserInterface[] = [
  {
    id: "1",
    email: "user@example.com",
    firstName: "John",
    password: "password123",
  },
]

const LoginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" })
    return
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, firstName: user.firstName },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  res.json({ token })
}

export default LoginUser
