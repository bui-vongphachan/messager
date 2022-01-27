import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Cookies from "universal-cookie";
import RootHomePageComponent from "../components/home";
import { GetHomePageQueryResponse, useGetHomeQueryString } from "../hooks";

const Home = (props: GetHomePageQueryResponse) => {
  return (
    <Fragment>
      <Head>
        <title>Messenger | ສົ່ງຂໍ້ຄວາມ</title>
        <meta name="home page" content="ສົ່ງຂໍ້ຄວາມ " />
        <link rel="icon" href="/troll.ico" />
      </Head>
      <main>HAHA</main>
    </Fragment>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;
  const cookie = new Cookies(req.headers.cookie);

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: " http://localhost:4000/graphql",
      headers: {
        Authorization: cookie.get("access_token"),
      },
    }),
    cache: new InMemoryCache(),
  });

  const response = await client.query<GetHomePageQueryResponse>({
    query: useGetHomeQueryString,
  });

  // Pass data to the page via props
  return {
    props: {
      ...response.data,
    },
  };
}

export default Home;
