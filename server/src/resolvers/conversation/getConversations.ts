import { ResolverContext } from "..";
import { ConversationModel, ReadMessageModel } from "../../models";
import dotenv from "dotenv";
import { AuthenticationError } from "apollo-server";

dotenv.config();

export const getConversations = async (
  _: any,
  __: any,
  context: ResolverContext
) => {
  if (!context.isAuthenticated || !context.profile) {
    throw new AuthenticationError("You must be logged in");
  }

  const conversations = await ConversationModel.find({
    participants: context.profile._id,
    schema_version: process.env.SCHEMA_VERSION_CONVERSATION,
  })
    .populate([
      {
        path: "participants",
      },
      {
        path: "lastest_message",
        match: { schema_version: process.env.SCHEMA_VERSION_MESSAGE },
      },
    ])
    .lean();

  const read_messages = await ReadMessageModel.find({
    profile: context.profile._id,
    schema_version: process.env.SCHEMA_VERSION_READ_MESSAGE,
    message: {
      $in: conversations
        .filter((conversation) => {
          return conversation.lastest_message !== null;
        })
        .map((conversation) => {
          if (typeof conversation.lastest_message !== "string") {
            return conversation.lastest_message._id;
          } else return conversation.lastest_message;
        }),
    },
  }).lean();

  const read_messages_map = conversations.map((conversation) => {
    const isUnread = read_messages.find((read_message) => {
      if (typeof conversation.lastest_message !== "string") {
        return conversation.lastest_message._id !== read_message.message;
      } else return conversation.lastest_message !== read_message.message;
    });

    return { ...conversation, isUnread: !isUnread };
  });

  return read_messages_map;
};
