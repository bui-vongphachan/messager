import { AuthenticationError } from "apollo-server";
import moment from "moment";
import { ResolverContext } from "..";
import { firebaseDatabase } from "../../helpers/firebase";
import { FacebookProfileModel, FirebaseUser } from "../../models";

export const getFacebookProfiles = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) {
      throw new AuthenticationError("You must be logged in");
    }

    const profiles = await FacebookProfileModel.find().lean();

    const profilesDB = firebaseDatabase.ref(`/profiles`);

    let users: FirebaseUser[] = [];
    await profilesDB.once("value", (snapshot) => {
      users = Object.values(snapshot.val()) as FirebaseUser[];
    });

    return profiles.map((profile) => {
      const user = users.find((user) => {
        return profile._id.toString() === user.user_id;
      });
      return {
        ...user,
        ...profile,
        last_seen: moment(user.last_changed).format("HH:mm"),
      };
    });
  } catch (error) {
    return error;
  }
};
