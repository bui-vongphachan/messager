import { newMessage } from "./newMessages";
import { sendMessage } from "./sendMessage";
import { getMessages } from "./getMessages";

export const message = {
  Query: { getMessages },
  Mutation: { sendMessage },
  Subscription: { newMessage },
};
