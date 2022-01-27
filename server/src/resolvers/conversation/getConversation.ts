import { ResolverContext } from "..";
import { ConversationModel, ProfileModel } from "../../models";

export const getConversation = async (
  _: any,
  args: { profile_id: string },
  context: ResolverContext
) => {
  if (!context.isAuthenticated) throw new Error("You must be logged in");

  const profile = await ProfileModel.findById(args.profile_id);

  if (!profile) throw new Error("Profile not found");

  let conversation = await ConversationModel.findOne({
    participants: [context.profile._id, args.profile_id],
  }).populate("participants lastest_message");

  if (!conversation) {
    conversation = await new ConversationModel({
      name: profile.username,
      participants: [context.profile._id, args.profile_id],
    }).save();

    conversation = await ConversationModel.populate(conversation, {
      path: "participants",
      model: "profile",
    });
  }

  return conversation;
};
