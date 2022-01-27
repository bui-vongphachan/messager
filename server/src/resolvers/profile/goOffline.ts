import { ResolverContext } from "..";
import { pubsub } from "../../helpers";
import { ProfileModel } from "../../models";

export const updatePresenceStatus = async (
  parent: any,
  args: { status: boolean },
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) throw new Error("You must be logged in");

    const profile = await ProfileModel.findByIdAndUpdate(
      context.profile._id,
      {
        is_online: args.status,
        last_active_date: new Date().toISOString(),
      },
      { new: true }
    ).lean();

    await pubsub.publish("PROFILE_UPDATED", { getMoreProfiles: profile });

    return profile;
  } catch (error) {
    return error;
  }
};
