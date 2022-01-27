import { SubscriptionResult, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { Message } from "../models";

export interface GetNewMessageResponse {
  newMessage: Message;
}

export interface GetNewMessageVairables extends AnyData {}

export const useGetNewMessage = (): SubscriptionResult<
  GetNewMessageResponse,
  GetNewMessageVairables
> => {
  const Result = useSubscription<GetNewMessageResponse, GetNewMessageVairables>(
    queryString
  );

  return Result;
};

const queryString = gql`
  subscription Subscription {
    newMessage {
      _id
      text
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      is_read
    }
  }
`;
