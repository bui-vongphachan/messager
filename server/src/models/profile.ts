import mongoose from "mongoose";
import { UserDoc } from ".";

export interface ProfileDoc extends mongoose.Document {
  id: string;
  users: UserDoc[] | string[];
  username: string;
  is_online: boolean;
  last_active_date: string;
  socket_key: string
  schema_version: number;
}

interface Doc extends mongoose.Model<ProfileDoc> {}

const Schema = new mongoose.Schema(
  {
    users: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    ],
    is_online: { type: Boolean, default: false },
    last_active_date: { type: Date, default: Date.now },
    username: { type: String, default: null },
    socket_key: { type: String, default: null },
    schema_version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

Schema.index({ users: 1 });
Schema.index({ is_online: 1 });
Schema.index({ schema_version: 1 });

export const ProfileModel = mongoose.model<ProfileDoc, Doc>("profile", Schema);
