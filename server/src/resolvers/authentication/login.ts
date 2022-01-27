import { ProfileModel, UserModel } from "../../models";
import jwt from "jsonwebtoken";

export const login = async (
  _: any,
  args: {
    email: string;
  }
) => {
  const { email } = args;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");
  else {
    const profiles = await ProfileModel.find({
      user: { $elemMatch: user._id },
    }).populate("users");

    return profiles;
  }
};
