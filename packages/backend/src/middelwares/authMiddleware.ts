import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

const authenticateMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  // console.log(authHeader)
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Authentication token required" })
    return
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ;(req as any).user = user
    next()
  } catch (err) {
    res.status(403).json({ message: "Invalid token" })
  }
}

export default authenticateMiddleware
