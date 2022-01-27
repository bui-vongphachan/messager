import { gql } from "apollo-server";
import { authentication } from "./authentication";
import { user } from "./user";
import { profile } from "./profile";
import { message } from "./message";
import { read_message } from "./read-message";
import { conversation } from "./conversation";
import { facebook_profile } from "./facebook-profile";

export const type_defs = [
  gql`
    scalar Date
  `,
  authentication,
  user,
  profile,
  message,
  /* read_message, */
  conversation,
  facebook_profile,
];
