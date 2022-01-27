import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { FirebaseUser } from "../models";

export interface GetUserPresencesResponse {
  getUserPresences: FirebaseUser[];
}

export interface GetMoreUserPresencesResponse {
  getMoreUserPresences: FirebaseUser;
}

export interface GetUserPresencesResponseVariables extends AnyData {}

export const useGetUserPresences = (): [
  QueryResult<GetUserPresencesResponse, GetUserPresencesResponseVariables>,
  () => void
] => {
  const Result = useQuery<
    GetUserPresencesResponse,
    GetUserPresencesResponseVariables
  >(queryString);

  const more = () => {
    if (Result.called && Result.data && !Result.loading && !Result.error) {
      Result.subscribeToMore<GetMoreUserPresencesResponse>({
        document: subscriptionString,
        updateQuery: (prev, { subscriptionData }) => {
          let presences = [...prev.getUserPresences];
          const newPresence = subscriptionData.data.getMoreUserPresences;

          const index = presences.findIndex(
            (p) => p.user_id === newPresence.user_id
          );

          presences[index] = newPresence;

          return {
            getUserPresences: [...presences],
          };
        },
      });
    }
  };

  return [Result, more];
};

const queryString = gql`
  query GetUserPresences {
    getUserPresences {
      status
      user_id
      user_name
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
