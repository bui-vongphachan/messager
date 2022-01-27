import { gql } from "apollo-server";

export const read_message = gql`
  type ReadMessage {
    _id: String
    message: Message
    profile: Profile
    createdAt: String
    updatedAt: String
  }
  type Query {
    getUnreadMessages: [ReadMessage]
  }
  type Mutation {
    sendMessage(conversation: String, text: String): Message
  }
  type Subscription {
    moreUnreadMessages: [ReadMessage]
  }
`;
