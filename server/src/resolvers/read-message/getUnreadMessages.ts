import { ResolverContext } from "..";
import { ReadMessageModel } from "../../models";

export const getUnreadMessages = async (
  _: any,
  __: any,
  context: ResolverContext
) => {
  if (!context.isAuthenticated) throw new Error("You must be logged in");

  const read_messages = await ReadMessageModel.find({
    profile: context.profile._id,
  })
    .populate("message")
    .lean();

  return read_messages;
};
