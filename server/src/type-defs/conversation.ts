import { gql } from "apollo-server";

export const conversation = gql`
  type Conversation {
    _id: String
    name: String
    participants: [FacebookProfile]
    lastest_message: Message
    schema_version: Int
  }
  type ActiveConversation {
    _id: String
    name: String
    participants: [FacebookProfile]
    lastest_message: Message
    schema_version: Int
    isUnread: Boolean
  }
  type Query {
    getConversations: [ActiveConversation]
    getConversation(profile_id: ID): Conversation
  }
  type Mutation {
    createConversation(profile_id: ID): Conversation
  }
  type Subscription {
    getNewConversations: [Conversation]
  }
`;
