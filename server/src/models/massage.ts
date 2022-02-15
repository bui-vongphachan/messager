import mongoose from "mongoose";
import { FacebookProfileDoc } from ".";

export interface MessageDoc extends mongoose.Document {
  id: string;
  content_type: string;
  text: string;
  from: FacebookProfileDoc;
  to: FacebookProfileDoc;
  schema_version: number;
  createdAt: string;
}

interface Doc extends mongoose.Model<MessageDoc> {}

const Schema = new mongoose.Schema(
  {
    content_type: { type: String, default: null },
    text: { type: String, default: null },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facebook_profile",
      default: null,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facebook_profile",
      default: null,
    },
    schema_version: { type: Number, default: 4 },
  },
  {
    timestamps: true,
  }
);

Schema.index({ schema_version: 1 });

export const MessageModel = mongoose.model<MessageDoc, Doc>("message", Schema);
