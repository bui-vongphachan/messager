import { ResolverContext } from "..";
import { MessageModel, ProfileDoc } from "../../models";

export const getLastestMessages = async (
  _: any,
  args: { profile_id: string },
  context: ResolverContext
) => {
  if (!context.isAuthenticated) throw new Error("You must be logged in");

  const messages = await MessageModel.find({
    $or: [
      {
        sender: context.profile._id,
        receiver: args.profile_id,
      },
      {
        sender: args.profile_id,
        receiver: context.profile._id,
      },
    ],
  })
    .lean()
    .populate("sender receiver")
    .sort({ createdAt: -1 })
    .limit(50);

  return messages;
};
