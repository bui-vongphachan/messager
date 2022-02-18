import { ResolverContext } from "..";
import { MessageModel, ProfileDoc } from "../../models";

export const getMessages = async (
  _: any,
  args: { receiver_id: string },
  context: ResolverContext
) => {
  if (!context.isAuthenticated) throw new Error("You must be logged in");

  const messages = await MessageModel.find({
    to: args.receiver_id,
  })
    .sort({ _id: -1 })
    .lean()
    .populate("from to")
    .limit(50)
    .lean();

  return messages.reverse();
};
