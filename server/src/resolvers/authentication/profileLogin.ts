import { ProfileModel } from "../../models";
import jwt from "jsonwebtoken";

export const profileLogin = async (
  _: any,
  args: {
    profile_id: string;
  }
) => {
  const profile = await ProfileModel.findById(args.profile_id).lean();

  if (!profile) throw new Error("Profile not found");

  const token = jwt.sign({ ...profile, id: profile.id }, "6013dd92019", {
    expiresIn: "30d",
  });

  return token;
};
