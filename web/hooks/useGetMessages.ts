import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { FacebookProfile, Message } from "../models";

export interface GetNewMessagesResponse {
  getMessages: Message[];
}

export interface NewMessageSubscriptionResponse {
  newMessage: Message;
}
export interface GetNewMessagesVairables extends AnyData {
  receiverId: string | undefined;
}

export const useGetMessages = (variables: {
  profile: FacebookProfile | null | undefined;
}): [QueryResult<GetNewMessagesResponse, GetNewMessagesVairables>] => {
  let isCalled = false;
  const Result = useQuery<GetNewMessagesResponse, GetNewMessagesVairables>(
    queryString,
    {
      skip: !variables.profile,
      variables: { receiverId: variables.profile?._id },
    }
  );

  if (Result.error) {
    alert(Result.error.message);
  }

  if (Result.called && !Result.loading && !Result.error) {
    if (!isCalled) {
      Result.subscribeToMore<NewMessageSubscriptionResponse>({
        document: subscriptionString,
        updateQuery: (prev, { subscriptionData }) => {
          let previosMessages = [...prev.getMessages];
          const { newMessage } = subscriptionData.data;
          const existing_message = previosMessages.find((message) => {
            return message._id === newMessage._id;
          });

          if (!existing_message) {
            previosMessages = [...previosMessages, newMessage];
          }

          isCalled = true;
          return {
            getMessages: previosMessages,
          };
        },
      });
    }
  }

  return [Result];
};

const queryString = gql`
  query GetMessages($receiverId: ID) {
    getMessages(receiver_id: $receiverId) {
      _id
      text
      from {
        _id
        name
        picture
      }
      to {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;

const subscriptionString = gql`
  subscription NewMessage {
    newMessage {
      _id
      text
      from {
        _id
        name
        picture
      }
      to {
        _id
        name
        picture
      }
      createdAt
    }
  }
`;
