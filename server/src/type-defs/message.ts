import { gql } from "apollo-server";

export const message = gql`
  type Message {
    _id: String
    content_type: String
    text: String
    from: FacebookProfile
    to: FacebookProfile
    schema_version: Int
    createdAt: Date
  }
  type Query {
    getMessages(receiver_id: ID): [Message]
  }
  type Mutation {
    sendMessage(receiver_id: String, text: String): Message
  }
  type Subscription {
    newMessage: Message
  }
`;
