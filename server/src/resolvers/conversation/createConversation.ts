import { ResolverContext } from "..";
import { ConversationModel, FacebookProfileModel } from "../../models";

export const createConversation = async (
  _: any,
  args: { profile_id: string },
  context: ResolverContext
) => {
  if (!context.isAuthenticated) throw new Error("You must be logged in");

  const profile = await FacebookProfileModel.findOne({ _id: args.profile_id });

  if (!profile) throw new Error("Profile not found");

  let conversation = await ConversationModel.create({
    name: profile.name,
    participants: [profile._id, context.profile._id],
  });

  conversation = await ConversationModel.populate(conversation, {
    path: "participants",
  });

  return conversation;
};
