import { QueryResult, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { AnyData } from ".";
import { FacebookProfile } from "../models";

export interface GetProfilesResponse {
  getFacebookProfiles: FacebookProfile[];
}

export interface GetProfilesVariables extends AnyData {}

export const useGetProfiles = (): QueryResult<
  GetProfilesResponse,
  GetProfilesVariables
> => {
  const GetProfileResult = useQuery<GetProfilesResponse, GetProfilesVariables>(
    queryString
  );

  if (GetProfileResult.error) {
  }

  if (GetProfileResult.data) {
  }

  return GetProfileResult;
};

const queryString = gql`
  query GetFacebookProfiles {
    getFacebookProfiles {
      _id
      id
      name
      picture
    }
  }
`;
