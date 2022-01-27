import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { FacebookProfile, FirebaseUser, ProfileWithPresence } from "../models";

export interface GetHomePageQueryResponse {
  getMyFacebookProfile: FacebookProfile;
  getFacebookProfiles: ProfileWithPresence[];
  getUserPresences: FirebaseUser[];
  getMoreUserPresences: FirebaseUser;
}

export interface GetHomePageQueryVariables extends AnyData {}

export const useGetHomeQuery = (): [
  QueryResult<GetHomePageQueryResponse, GetHomePageQueryVariables>,
  () => void
] => {
  const Result = useQuery<GetHomePageQueryResponse, GetHomePageQueryVariables>(
    useGetHomeQueryString
  );

  const more = () => {
    if (Result.called && Result.data && !Result.loading && !Result.error) {
      Result.subscribeToMore<GetHomePageQueryResponse>({
        document: subscriptionString,
        updateQuery: (prev, { subscriptionData }) => {
          let presences = [...prev.getUserPresences];
          const newPresence = subscriptionData.data.getMoreUserPresences;

          const index = presences.findIndex(
            (p) => p.user_id === newPresence.user_id
          );

          presences[index] = newPresence;

          return {
            ...prev,
            getUserPresences: [...presences],
          };
        },
      });
    }
  };

  if (Result.error) {
  }

  if (Result.data) {
  }

  return [Result, more];
};

export const useGetHomeQueryString = gql`
  query HomePageQuery {
    getMyFacebookProfile {
      _id
      name
      picture
    }
    getFacebookProfiles {
      _id
      name
      picture
      status
      last_seen
    }
  }
`;

const subscriptionString = gql`
  subscription GetMoreUserPresences {
    getMoreUserPresences {
      status
      user_id
      user_name
      last_seen
    }
  }
`;
