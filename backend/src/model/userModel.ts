import mongoose, { Schema, Document, model, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    shareHash?: string;
    isSharing: boolean;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true
    },
    password: String,
    shareHash: { type: String, unique: true },
    isSharing: { type: Boolean, default: false }

})
const User = model<IUser>('User', userSchema)
export default User