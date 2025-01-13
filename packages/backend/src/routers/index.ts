import { Router } from "express"
import LoginUser from "../auth/Login"
import SignUp from "../auth/Signup"
import authenticateMiddleware from "../middelwares/authMiddleware"
import { productsController } from "../controllers"

const appRouter = Router()

appRouter.post("/auth/login", LoginUser)
appRouter.post("/auth/signup", SignUp)
appRouter.get("/products", authenticateMiddleware, productsController)

export default appRouter
