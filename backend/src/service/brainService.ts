import { Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import User, { IUser } from "../model/userModel";
import Content from "../model/contentModel";
import Brain from "../model/brainModel";
import { BASE_URL } from "../config/config";

export const toggleSharing = async (userId: Types.ObjectId, share: boolean) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    let brainShare = await Brain.findOne({ user: userId });

    if (!share) {
        if (brainShare) {
            brainShare.active = false;
            brainShare.shareHash = undefined;
            await brainShare.save();
        }

        return {
            message: 'Sharing of your brain has been stopped',
            shareHash: null,
            isActive: false,
            shareLink: null
          };
    }
    const newHash = uuidv4();

    if (!brainShare) {
        brainShare = await Brain.create({
            user: userId,
            shareHash: newHash,
            active: true
        });
    } else {
        brainShare.active = true;
        brainShare.shareHash = newHash;
        await brainShare.save();
    }

    return {
        message: "Your brain is now being shared",
        shareHash: brainShare.shareHash,
        isActive: true,
        shareLink: `${BASE_URL}/api/v1/brain/${brainShare.shareHash}`
      };
};
export const getSharedContent = async (shareHash: string) => {
    const brainShare = await Brain.findOne({ shareHash, active: true }).populate<{ user: IUser }>('user')
    if (!brainShare || !brainShare.user) {
        throw new Error('Invalid share link or ');
    }


    const content = await Content.find({ user: brainShare.user._id });

    return {
        username: brainShare.user.username,
        content: content.map(c => ({
            id: c._id,
            type: c.type,
            link: c.link,
            title: c.title,
            tags: c.tags
        }))
    }
}