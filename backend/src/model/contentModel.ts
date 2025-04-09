import mongoose, { Schema, Document, Types, model } from 'mongoose';

type ContentType = 'document' | 'tweet' | 'youtube' | 'link';

interface IContent extends Document {
    type: ContentType;
    link: string;
    title: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}

const contentSchema = new Schema<IContent>({
    type: {
        type: String,
        enum: ['document', 'tweet', 'youtube', 'link'],
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: 'Invalid URL format'
        }
    },
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    tags: {
        type: [String],
        validate: {
            validator: (v: string[]) => v.length <= 10,
            message: 'Maximum 10 tags allowed'
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, { timestamps: true });

export default model<IContent>('Content', contentSchema)