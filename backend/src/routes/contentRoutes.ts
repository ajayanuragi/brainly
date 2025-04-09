import { Router } from "express";
import { addContent, getContent, removeContent } from "../controller/contentController";
import { validate } from "../middleware/validate";
import { contentSchema } from "../validations/contentValidation";
import { authenticate } from "../middleware/authenticate";

const contentRouter = Router()

contentRouter.post('', authenticate, validate(contentSchema), addContent)
contentRouter.get('', authenticate, validate(contentSchema), getContent)
contentRouter.delete('', authenticate, removeContent)




export default contentRouter