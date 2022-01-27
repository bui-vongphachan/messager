import jwt from "jsonwebtoken";
import { FacebookProfileDoc, FacebookProfileModel } from "../models";

interface TokenVerificationResult {
  profile: FacebookProfileDoc | null;
  isAuthenticated: boolean;
}

export const verifyToken = async (
  token: string
): Promise<TokenVerificationResult> => {
  try {
    let isAuthenticated = false;
    let profile = jwt.decode(token, { json: true }) as FacebookProfileDoc;

    jwt.verify(token, process.env.JWT_SECRET, async (err, result) => {
      if (!err) {
        isAuthenticated = true;
      }
    });

    if (profile) {
      profile = await FacebookProfileModel.findOne({ _id: profile._id }).lean();
    }

    return { profile, isAuthenticated };
  } catch (error) {
    console.log("verifyToken", error);
    return null;
  }
};
