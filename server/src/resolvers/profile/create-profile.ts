import { ProfileModel, UserModel } from "../../models";

export const createProfile = async (
  _: any,
  args: {
    user_id: string;
    username: string;
  }
) => {
  try {
    const { username, user_id } = args;

    const profile = await ProfileModel.create({ username, users: [user_id] });

    if (!profile) {
      throw new Error("Something went wrong");
    } else {
      return profile;
    }
  } catch (error) {
    return error;
  }
};
