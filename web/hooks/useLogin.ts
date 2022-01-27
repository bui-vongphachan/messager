import { LazyQueryResult, useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Profile } from "../models";

export type AnyData = { [key: string]: any };

export interface LoginResponse {
  login: Profile[];
}

export interface LoginVariables extends AnyData {
  email: string;
}

export const useLogin = (): [
  (params: LoginVariables) => Promise<void>,
  LazyQueryResult<LoginResponse, LoginVariables>
] => {
  const [Login, LoginResult] = useLazyQuery<LoginResponse, LoginVariables>(
    LoginQueryString
  );

  const login = async (variables: LoginVariables) => {
    const response = await Login({ variables });

    if (response.error) {
    }

    if (response.data) {
    }
  };

  return [login, LoginResult];
};

export const LoginQueryString = gql`
  query Login($email: String) {
    login(email: $email) {
      _id
      username
    }
  }
`;
