import { Request, Response } from 'express';
import { getSharedContent, toggleSharing } from '../service/brainService';

export const shareBrain = async (req: Request, res: Response) => {
  try {
    const { share } = req.body;
    if (typeof share !== 'boolean') {
      res.status(400).json({
        error: 'Share must be a true or false'
      });
      return
    }
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return
    }

    const result = await toggleSharing(userId, share);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBrain = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params
    if (!shareLink) {
      res.status(400).json({
        success: false,
        error: 'contentId is required'
      });
      return
    }

    const result = await getSharedContent(shareLink)
    res.json({
      result
    })

  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}