import { LazyQueryResult, useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { Message } from "../models";

export interface GetLastestMessagesResponse {
  getLastestMessages: Message[];
}

export interface GetLastestMessagesVariables extends AnyData {
  profile_id: string;
}

export const useGetLastestMessages = (): [
  (params: GetLastestMessagesVariables) => Promise<void>,
  LazyQueryResult<GetLastestMessagesResponse, GetLastestMessagesVariables>
] => {
  const [GetLastestMessages, GetLastestMessagesResult] = useLazyQuery<
    GetLastestMessagesResponse,
    GetLastestMessagesVariables
  >(queryString);

  const getLastestMessages = async (variables: GetLastestMessagesVariables) => {
    const response = await GetLastestMessages({ variables });

    if (response.error) {
    }

    if (response.data) {
    }
  };

  return [getLastestMessages, GetLastestMessagesResult];
};

const queryString = gql`
  query GetLastestMessages($profile_id: ID) {
    getLastestMessages(profile_id: $profile_id) {
      _id
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      text
      content_type
      is_read
    }
  }
`;
