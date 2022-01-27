import { withFilter } from "graphql-subscriptions";
import { ResolverContext } from "..";
import { pubsub } from "../../helpers";
import { ProfileDoc, ProfileModel, UserModel } from "../../models";

export const getMoreProfiles = {
  subscribe: withFilter(
    () => pubsub.asyncIterator("PROFILE_UPDATED"),
    (
      payload: { getMoreProfiles: ProfileDoc },
      _: any,
      context: ResolverContext
    ) => {
      if (!context.isAuthenticated) throw new Error("You must be logged in");
      return true;
    }
  ),
};
