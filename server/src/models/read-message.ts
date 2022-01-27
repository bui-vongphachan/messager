import mongoose from "mongoose";
import { FacebookProfileDoc, MessageDoc } from ".";

export interface ReadMessageDoc extends mongoose.Document {
  _id: string;
  message: string | MessageDoc;
  profile: string | FacebookProfileDoc;
  createdAt: Date;
  updatedAt: Date;
}

interface Doc extends mongoose.Model<ReadMessageDoc> {}

const Schema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: null,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facebook_profile",
      default: null,
    },
    schema_version: { type: Number, default: 2 },
  },
  {
    timestamps: true,
  }
);

export const ReadMessageModel = mongoose.model<ReadMessageDoc, Doc>(
  "read_message",
  Schema
);
