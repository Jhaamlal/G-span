import "dotenv/config"
import express, { Request, Response } from "express"

import cors from "cors"
import appRouter from "./routers"

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", appRouter)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
