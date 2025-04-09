import { Request, Response } from 'express';
import { createContent, deleteContent, getUserContent } from '../service/contentServices';

export const addContent = async (req: Request, res: Response) => {
  try {
    const { type, link, title, tags } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return
    }

    const content = await createContent({
      type,
      link,
      title,
      tags,
      user: userId
    });
    res.status(201).json({
      success: true,
      data: {
        id: content._id,
        type: content.type,
        link: content.link,
        title: content.title,
        tags: content.tags,
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return
    }
    const content = await getUserContent(userId);

    res.json({
      content: content.map(item => ({
        id: item._id,
        type: item.type,
        link: item.link,
        title: item.title,
        tags: item.tags
      }))
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
export const removeContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return
    }

    if (!contentId) {
      res.status(400).json({
        success: false,
        error: 'contentId is required'
      });
      return
    }

    await deleteContent(contentId, userId);

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error: any) {
    if (error.message === 'Content not found') {
      res.status(404).json({
        success: false,
        error: error.message
      });
      return
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
