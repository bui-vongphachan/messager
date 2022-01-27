import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";
import Cookies from "universal-cookie";

export const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions) {
          switch (err.extensions.code) {
            case "UNAUTHENTICATED":
              return fromPromise(
                (async () => {
                  try {
                    const cookies = new Cookies();
                    const token = cookies.get("refresh_token");

                    const { data } = await axios.get(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
                        `/api/v1/auth/refresh-token?refresh_token=${token}`
                    );

                    cookies.set("access_token", data.access_token, {
                      path: "/",
                    });
                    cookies.set("refresh_token", data.refresh_token, {
                      path: "/",
                    });

                    return data.access_token;
                  } catch (error) {
                    window.location.replace("/login");
                  }
                })()
              )
                .filter((value) => Boolean(value))
                .flatMap(() => forward(operation));
            default:
              break;
          }
        } else {
          console.log(err.message);
        }
      }
    }
  }
);
