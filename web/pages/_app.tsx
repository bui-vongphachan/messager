import "../styles/globals.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { graphql_client } from "../helpers";
import { useEffect, useState } from "react";
import { defaultTheme } from "../components/theme";
import { ThemeProvider } from "@mui/material";
import Cookie from "universal-cookie";
function MyApp({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <ApolloProvider client={graphql_client}>
      <ThemeProvider theme={defaultTheme}>
        {loaded && <Component {...pageProps} />}
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (context: any) => {
  const cookie = new Cookie(
    context.ctx.req ? context.ctx.req.headers.cookie : ""
  );

  const user_id = cookie.get("user_id");
  const user_name = cookie.get("user_name");

  return {
    props: {},
  };
};

export default MyApp;
