import { createProfile } from "./create-profile";
import { getProfiles } from "./get-profiles";
import { getMoreProfiles } from "./get-more-profiles";
import { toggleOnlineStatus } from "./toggleOnlineStatus";
import { getProfile } from "./getProfile";
import { updatePresenceStatus } from "./goOffline";

export const profile = {
  Query: { getProfiles, getProfile },
  Mutation: { createProfile, toggleOnlineStatus, updatePresenceStatus },
  Subscription: { getMoreProfiles },
};
