import { Message, FacebookProfile } from ".";

export interface Conversation {
  _id: string;
  name: string;
  participants: FacebookProfile[];
  lastest_message: string | Message;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActiveConversation {
  _id: string;
  name: string;
  participants: FacebookProfile[];
  lastest_message: Message;
  createdAt: Date;
  updatedAt: Date;
  isUnread: Boolean;
}
