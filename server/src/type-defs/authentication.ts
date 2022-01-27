import { gql } from "apollo-server";

export const authentication = gql`
  type Query {
    login(email: String): [Profile]
    profileLogin(profile_id: ID): String
  }
  type Mutation {
    register(email: String, password: String): Boolean
  }
`;
