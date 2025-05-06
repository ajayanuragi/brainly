import { authenticateUser, createUser, generateAuthToken, verifyCredentials } from "../service/userServices";
import { Request, Response } from "express";

export const signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const newUser = await createUser(username, password);

        res.status(201).json({
            success: true,
            message: 'Signup successful',
            user: {
                userId: newUser._id,
                username: newUser.username
            }
        });

    } catch (error: any) {
        if (error.message === 'USER_EXISTS') {
            res.status(409).json({
                success: false,
                message: "Username already taken"
            });
            return;
        }
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const signinUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { token, userId, name } = await authenticateUser(username, password);

        res.status(200).json({
            success: true,
            message: 'Signin successful',
            user: {
                userId,
                username: name
            },
            token
        });

    } catch (error: any) {
        console.error('Signin error:', error);

        if (error.message === 'Credential verification failed') {
            res.status(403).json({
                success: false,
                message: 'Invalid username or password'
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};