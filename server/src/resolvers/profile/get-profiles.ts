import { ResolverContext } from "..";
import { ProfileDoc, ProfileModel } from "../../models";

export const getProfiles = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) throw new Error("You must be logged in");

    return await ProfileModel.find({
      _id: { $ne: context.profile._id },
    }).lean();

  } catch (error) {
    return error;
  }
};
