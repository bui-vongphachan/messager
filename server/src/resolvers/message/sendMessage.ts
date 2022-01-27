import { ResolverContext } from "..";
import { pubsub } from "../../helpers";
import { MessageModel } from "../../models";

export const sendMessage = async (
  _: any,
  args: {
    receiver_id: string;
    text: string;
  },
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) throw new Error("You must be logged in");

    const { receiver_id, text } = args;

    const { profile } = context;

    let newMessage = await MessageModel.create({
      from: profile._id,
      to: receiver_id,
      text,
    });

    newMessage = await MessageModel.populate(newMessage, "from to");

    pubsub.publish("NEW_MESSAGES", {
      newMessage,
    });

    return newMessage;
  } catch (error) {
    return error;
  }
};
