import { MessageModel } from "../models";

export const getNewMessages = async (id: string) => {
  try {
    const messages = await MessageModel.find({
      receiver: id,
      isRead: false,
    })
      .populate("sender receiver")
      .lean()
      .sort({ createdAt: -1 });

    return messages;
  } catch (error) {
    return error;
  }
};
