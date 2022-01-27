import { ResolverContext } from "..";
import { ProfileModel } from "../../models";

export const getProfile = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) throw new Error("You must be logged in");

    return await ProfileModel.findOne({
      _id: context.profile._id,
    }).lean();
  } catch (error) {
    return error;
  }
};
