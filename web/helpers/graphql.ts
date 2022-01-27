import {
  split,
  HttpLink,
  ApolloClient,
  InMemoryCache,
  from,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "apollo-link-ws";
import { errorLink } from "./graphql-errors";
import Cookies from "universal-cookie";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token");

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const wsLink = process.browser
  ? (new WebSocketLink({
      uri: "ws://localhost:4000/subscriptions",
      options: {
        reconnect: true,
        connectionParams: () => {
          const cookies = new Cookies();
          const token = cookies.get("access_token");
          return {
            Authorization: token,
          };
        },
        connectionCallback: (error) => {},
      },
    }) as any)
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const graphql_client = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});
