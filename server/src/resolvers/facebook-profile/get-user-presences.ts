import { AuthenticationError } from "apollo-server";
import moment from "moment";
import { ResolverContext } from "..";
import { firebaseDatabase } from "../../helpers/firebase";
import { FirebaseUser } from "../../models";

export const getUserPresences = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) {
      throw new AuthenticationError("You must be logged in");
    }

    const profiles = firebaseDatabase.ref(`/profiles`);

    let users: FirebaseUser[] = [];
    await profiles.once("value", (snapshot) => {
      users = Object.values(snapshot.val()) as FirebaseUser[];
    });

    return users
      .filter((user) => {
        return user.user_id !== context.profile._id.toString();
      })
      .map((user) => ({
        ...user,
        last_seen: moment(user.last_changed).format("HH:mm:ss"),
      }));
  } catch (error) {
    return error;
  }
};
