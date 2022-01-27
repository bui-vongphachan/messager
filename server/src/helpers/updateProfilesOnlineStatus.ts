import { pubsub } from ".";
import { ProfileModel } from "../models";

export const updateProfileOnlineStatus = async (
  id: string,
  status: boolean
) => {
  try {
    const profile = await ProfileModel.findByIdAndUpdate(
      id,
      {
        is_online: status,
        last_active_date: new Date(),
      },
      { new: true }
    );
    
    await pubsub.publish("PROFILE_UPDATED", { getMoreProfiles: profile });
  } catch (error) {
    return error;
  }
};
