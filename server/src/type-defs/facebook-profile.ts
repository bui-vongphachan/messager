import { gql } from "apollo-server";

export const facebook_profile = gql`
  type FacebookProfile {
    _id: String
    id: String
    name: String
    picture: String
    email: String
    birthday: String
    gender: String
    accessToken: String
  }
  type PresenceUser {
    _id: String
    id: String
    name: String
    picture: String
    email: String
    birthday: String
    gender: String
    last_seen: String
    status: String
  }
  type Query {
    getFacebookProfiles: [PresenceUser]
    getMyFacebookProfile: FacebookProfile
    getUserPresences: [PresenceUser]
  }
  type Subscription {
    getMoreUserPresences: PresenceUser
  }
`;
