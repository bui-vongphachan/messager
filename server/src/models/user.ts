import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  schema_version: number;
}

interface Doc extends mongoose.Model<UserDoc> {}

const Schema = new mongoose.Schema(
  {
    email: { type: String, default: null, unique: true },
    schema_version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

Schema.index({ email: 1 }, { unique: true });
Schema.index({ schema_version: 1 });

export const UserModel = mongoose.model<UserDoc, Doc>("user", Schema);
