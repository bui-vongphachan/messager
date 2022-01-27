import { gql } from "apollo-server";

export const profile = gql`
  type Profile {
    _id: String
    username: String
    users: [User]
    is_online: Boolean
    last_active_date: String
  }
  type CreateProfileResponse {
    _id: String
    username: String
    users: [String]
    is_online: Boolean
    last_active_date: String
  }
  type Query {
    getProfiles: [CreateProfileResponse]
    getProfile: Profile
  }
  type Mutation {
    updatePresenceStatus(status: Boolean): Profile
    toggleOnlineStatus(profile_id: ID, status: Boolean): Profile
    createProfile(user_id: ID, username: String): CreateProfileResponse
  }
  type Subscription {
    getMoreProfiles: Profile
  }
`;
