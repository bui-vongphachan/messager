import { UserModel } from "../../models";
import bcrypt from "bcrypt";

export const register = async (
  _: any,
  args: {
    email: string;
    password: string;
  }
) => {
  try {
    const { email, password } = args;
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    } else {
      const salt = await bcrypt.genSalt(7);
      const hash = await bcrypt.hash(password, salt);
      const user = await UserModel.create({ email, password: hash });

      if (!user) {
        throw new Error("Something went wrong");
      } else {
        return true;
      }
    }
  } catch (error) {
    return error;
  }
};
