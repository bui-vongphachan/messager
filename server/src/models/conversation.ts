import mongoose from "mongoose";
import { FacebookProfileDoc, MessageDoc } from ".";

export interface ConversationDoc extends mongoose.Document {
  _id: string;
  name: string;
  participants: string[] | FacebookProfileDoc[];
  lastest_message: string | MessageDoc;
  createdAt: Date;
  updatedAt: Date;
}

interface Doc extends mongoose.Model<ConversationDoc> {}

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "facebook_profile",
      },
    ],
    lastest_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: null,
    },
    schema_version: { type: Number, default: 2 },
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.model<ConversationDoc, Doc>(
  "conversation",
  Schema
);
