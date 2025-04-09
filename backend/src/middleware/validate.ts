import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(411).json({ errors: result.error.errors });
            return; 
        }
        next();
    };