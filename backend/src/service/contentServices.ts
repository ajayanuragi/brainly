import { Types } from "mongoose";
import Content from "../model/contentModel";
type ContentType = {
    type: 'document' | 'tweet' | 'youtube' | 'link';
    link: string;
    title: string;
    tags?: string[];
    user: Types.ObjectId;
}

export const createContent = async (contentData: ContentType) => {
    const newContent = await Content.create(contentData);
    return newContent;
};

export const getContentById = async (id: string) => {
    return await Content.findById(id);
};

export const getUserContent = async (userId: Types.ObjectId) => {
    return await Content.find({
        user: userId
    }).sort({ createdAt: -1 });
};

export const deleteContent = async (contentId: string, userId: Types.ObjectId) => {
    const result = await Content.findOneAndDelete({ _id: contentId, user: userId });
    if (!result) {
        throw new Error('Content not found');
    }
    return result;
};
