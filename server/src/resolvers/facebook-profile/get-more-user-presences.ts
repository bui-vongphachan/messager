import { AuthenticationError } from "apollo-server";
import { withFilter } from "graphql-subscriptions";
import { ResolverContext } from "..";
import { pubsub } from "../../helpers";
import { FACEBOOK_PROFILE_QUEUE } from "../../models";

export const getMoreUserPresences = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(FACEBOOK_PROFILE_QUEUE.PRESENCE_CHANGES),
    (payload: any, _: any, context: ResolverContext) => {
      if (!context.isAuthenticated) {
        throw new AuthenticationError("You must be logged in");
      }

      return true;
    }
  ),
};
