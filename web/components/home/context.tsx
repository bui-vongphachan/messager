import { SubscriptionResult } from "@apollo/client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

import {
  GetHomePageQueryResponse,
  GetNewMessageResponse,
  GetNewMessageVairables,
  useGetHomeQuery,
} from "../../hooks";
import { ProfileWithPresence } from "../../models";

export interface HomePageInterface {
  dataSet?: GetHomePageQueryResponse;
  NewMessageSubscription?: SubscriptionResult<
    GetNewMessageResponse,
    GetNewMessageVairables
  >;

  selectedProfile?: ProfileWithPresence | null;
  setSelectedProfile?: Dispatch<SetStateAction<any>>;
}

export const HomePageContext = createContext<HomePageInterface>({});

const HomePageContextProvider = (props: { children: any }) => {
  const [result] = useGetHomeQuery();
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <HomePageContext.Provider
      value={{
        dataSet: result.data,
        selectedProfile,
        setSelectedProfile,
      }}
    >
      {props.children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;
