import mongoose from "mongoose";
import { UserDoc } from ".";

export interface FacebookProfileDoc extends mongoose.Document {
  id: string;
  name: string;
  picture: string;
  email: string;
  birthday: string;
  gender: string;
  accessToken: string;
  schema_version: number;
}

interface Doc extends mongoose.Model<FacebookProfileDoc> {}

const Schema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    picture: { type: String, default: "" },
    email: { type: String, default: "" },
    birthday: { type: String, default: "" },
    gender: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    schema_version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

Schema.index({ id: 1 });
Schema.index({ name: "text" });
Schema.index({ schema_version: 1 });

export const FacebookProfileModel = mongoose.model<FacebookProfileDoc, Doc>(
  "facebook_profile",
  Schema
);
