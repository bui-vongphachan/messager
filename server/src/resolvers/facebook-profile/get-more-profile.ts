import { ResolverContext } from "..";
import { FacebookProfileModel } from "../../models";

export const getMyFacebookProfile = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) throw new Error("You must be logged in");

    return await FacebookProfileModel.find({
      _id: context.profile._id,
    }).lean();
  } catch (error) {
    return error;
  }
};
