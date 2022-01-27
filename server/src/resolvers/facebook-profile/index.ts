import { getFacebookProfiles } from "./get-facebook-profiles";
import { getMyFacebookProfile } from "./get-my-profile";
import { getUserPresences } from "./get-user-presences";
import { getMoreUserPresences } from "./get-more-user-presences";

export const facebook_profile = {
  Query: { getFacebookProfiles, getMyFacebookProfile, getUserPresences },
  Mutation: {},
  Subscription: { getMoreUserPresences },
};
