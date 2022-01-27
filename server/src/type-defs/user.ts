import { gql } from "apollo-server";

export const user = gql`
  type User {
    id: ID
    username: String
  }
`;
