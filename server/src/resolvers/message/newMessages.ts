import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { MessageDoc, MessageModel, ProfileDoc } from "../../models";
import { ResolverContext } from "..";

export const newMessage = {
  subscribe: withFilter(
    () => pubsub.asyncIterator("NEW_MESSAGES"),
    (
      payload: { newMessages: MessageDoc[] },
      _: any,
      context: ResolverContext
    ) => {
      if (!context.isAuthenticated) throw new Error("You must be logged in");

      return true;
    }
  ),
};
