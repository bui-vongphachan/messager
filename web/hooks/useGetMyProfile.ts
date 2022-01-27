import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { FacebookProfile } from "../models";

export interface GetProfileResponse {
  getMyFacebookProfile: FacebookProfile;
}

export interface GetProfileVariables extends AnyData {}

export const useGetMyProfile = (): QueryResult<
  GetProfileResponse,
  GetProfileVariables
> => {
  const Result = useQuery<GetProfileResponse, GetProfileVariables>(queryString);

  if (Result.error) {
    /* Result.error.graphQLErrors.forEach((error) => {
      if (error.extensions.code === "UNAUTHENTICATED") {
        Result.refetch();
      }
    }); */
  }

  if (Result.data) {
  }

  return Result;
};

const queryString = gql`
  query GetMyFacebookProfile {
    getMyFacebookProfile {
      _id
      name
      picture
    }
  }
`;
