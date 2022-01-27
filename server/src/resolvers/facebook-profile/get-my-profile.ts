import { ResolverContext } from "..";
import { FacebookProfileModel } from "../../models";
import { AuthenticationError } from "apollo-server";

export const getMyFacebookProfile = async (
  parent: any,
  args: any,
  context: ResolverContext
) => {
  try {
    if (!context.isAuthenticated) {
      throw new AuthenticationError("You must be logged in");
    }

    return await FacebookProfileModel.findOne().lean();
  } catch (error) {
    return error;
  }
};
