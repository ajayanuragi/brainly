import { Router } from "express";
import { validate } from "../middleware/validate";
import { signinScehma, signupSchema } from "../validations/userValidation";
import { signinUser, signupUser } from "../controller/userController";

const userRouter = Router()

userRouter.post('/signup', validate(signupSchema), signupUser)
userRouter.post('/signin', validate(signinScehma), signinUser)

export default userRouter