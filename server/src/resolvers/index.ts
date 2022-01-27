import { authentication } from "./authentication";
import { profile } from "./profile";
import { message } from "./message";
import { FacebookProfileDoc } from "../models";
import { conversation } from "./conversation";
import { read_message } from "./read-message";
import { facebook_profile } from "./facebook-profile";

export interface ResolverContext {
  isAuthenticated: boolean;
  profile: FacebookProfileDoc | null;
}

export const resolvers = [
  authentication,
  profile,
  message,
  conversation,
 /*  read_message, */
  facebook_profile
];
