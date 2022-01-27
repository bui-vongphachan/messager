import { login } from "./login";
import { register } from "./register";
import { profileLogin } from "./profileLogin";

export const authentication = {
  Query: { login, profileLogin },
  Mutation: { register },
};
