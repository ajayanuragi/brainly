import { Schema, model, Types, Document } from 'mongoose';
import { IUser } from './userModel';

export interface IBrain extends Document {
  user: Types.ObjectId | IUser
  shareHash?: string;
  active: boolean;
}

const brainSchema = new Schema<IBrain>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  shareHash: { type: String, unique: true, required: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Brain = model<IBrain>('Brain', brainSchema);
export default Brain;
