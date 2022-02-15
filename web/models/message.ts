import { FacebookProfile } from ".";

export interface Message {
  _id: string;
  id: string;
  content_type: string;
  text: string;
  from: FacebookProfile;
  to: FacebookProfile;
  schema_version: number;
  createdAt: string;
}
