import { FirebaseUser } from ".";

export interface FacebookProfile {
  _id: string;
  id: string;
  name: string;
  picture: string;
  email: string;
  birthday: string;
  gender: string;
  schema_version: number;
}

export interface ProfileWithPresence extends FacebookProfile, FirebaseUser {}
