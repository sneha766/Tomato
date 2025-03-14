import express from 'express'
import { loginUser,RegisterUser } from '../controllers/user.controller.js'

const UserRouter = express.Router()

UserRouter.post("/register",RegisterUser)
UserRouter.post("/login",loginUser)

export default UserRouter