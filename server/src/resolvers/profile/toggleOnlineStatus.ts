import { pubsub } from "../../helpers";
import { ProfileModel } from "../../models";

export const toggleOnlineStatus = async (
  _: any,
  args: {
    profile_id: string;
    status: boolean;
  }
) => {
  try {
    const { profile_id, status } = args;

    const profile = await ProfileModel.findByIdAndUpdate(profile_id, {
      is_online: status,
      last_active_date: new Date(),
    });

    if (!profile) throw new Error("Something went wrong");
    else {
      await pubsub.publish("PROFILE_UPDATED", { getMoreProfiles: profile });
      return profile;
    }
  } catch (error) {
    return error;
  }
};
