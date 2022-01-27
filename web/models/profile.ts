import { User } from "./user";

export interface Profile {
  _id: string;
  id: string;
  users: User[];
  username: string;
  is_online: boolean;
  last_active_date: string;
  schema_version: number;
}
