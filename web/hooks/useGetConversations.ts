import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { ActiveConversation } from "../models";

export interface GetConversationResponse {
  getConversations: ActiveConversation[];
}

export interface GetConversationVariables extends AnyData {}

export const useGetConversations = (): QueryResult<
  GetConversationResponse,
  GetConversationVariables
> => {
  const Result = useQuery<GetConversationResponse, GetConversationVariables>(
    queryString
  );

  if (Result.error) {
  }

  if (Result.data) {
  }

  return Result;
};

const queryString = gql`
  query GetConversations {
    getConversations {
      _id
      name
      participants {
        _id
        name
        picture
      }
      lastest_message {
        _id
        text
        sender {
          _id
          name
        }
      }
    }
  }
`;
