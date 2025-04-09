import 'dotenv/config'
export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET || 'SECRET'
export const MONGODB_URI = process.env.MONGODB_URI||'Mongodb url'
export const BASE_URL = process.env.BASE_URL!;