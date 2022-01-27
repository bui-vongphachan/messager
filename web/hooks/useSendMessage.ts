import { MutationResult, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { Message, Profile } from "../models";

export interface SendMessageResponse {
  sendMessage: Message;
}

export interface SendMessageVariables extends AnyData {
  receiverId: string;
  text: string;
}

export const useSendMessage = (): [
  (params: SendMessageVariables) => Promise<void>,
  MutationResult<SendMessageResponse>
] => {
  const [SendMessage, Result] = useMutation<
    SendMessageResponse,
    SendMessageVariables
  >(queryString);

  const sendMessage = async (variables: SendMessageVariables) => {
    const response = await SendMessage({ variables });
  };

  return [sendMessage, Result];
};

const queryString = gql`
  mutation SendMessage($receiverId: String, $text: String) {
    sendMessage(receiver_id: $receiverId, text: $text) {
      from {
        _id
        name
      }
      to {
        _id
        name
      }
      text
      _id
    }
  }
`;
