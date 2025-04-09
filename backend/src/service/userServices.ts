import User from "../model/userModel"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config"
export const createUser = async (username: string, password: string) => {
    const existingUser = await findUserByUserName(username)
    if (existingUser) {
        throw new Error("USER_EXISTS")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await User.create({ username, password: hashedPassword })

}
export const findUserByUserName = async (username: string) => {
    return await User.findOne({ username })
}
export const authenticateUser = async (username: string, password: string) => {
    const { user, isValid } = await verifyCredentials(username, password)
    if (!isValid || !user) throw new Error("INVALID_CREDENTIALS")

    const token = generateAuthToken(user._id.toString())
    return { token, userId: user._id, name: user.username }
}

export const generateAuthToken = (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7D' })
}



export const verifyCredentials = async (username: string, password: string) => {
    const user = await findUserByUserName(username)
    if (!user || !user.password) {
        return { user: null, isValid: false }
    }
    const isValid = await bcrypt.compare(password, user.password)
    return { user: isValid ? user : null, isValid }
}