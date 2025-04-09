
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import { JWT_SECRET } from '../config/config';


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return
        }

        const decoded = jwt.verify(token, JWT_SECRET!) as { userId: string };


        const user = await User.findById(decoded.userId);


        if (!user || !user.username) {
            res.status(401).json({ error: 'User not found' });
            return
        }

        req.user = {
            _id: user._id,
            username: user.username
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};