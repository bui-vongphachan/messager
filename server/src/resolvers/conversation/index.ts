import { createConversation } from "./createConversation";
import { getConversations } from "./getConversations";
import { getConversation } from "./getConversation";

export const conversation = {
  Query: { getConversations, getConversation },
  Mutation: { createConversation },
  Subscription: {},
};
