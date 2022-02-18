import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const AuthCallbackSuccessPage = (props: {
  access_token: string;
  refresh_token: string;
  user_id: string;
  user_name: string;
  user_picture: string;
  user_email: string;
  error_code: string;
  error_message: string;
}) => {
  const cookies = new Cookies();
  const router = useRouter();

  if (router.isReady && !props.error_code && !props.error_message) {
    cookies.set("user_id", props.user_id, { path: "/" });
    cookies.set("user_name", props.user_name, { path: "/" });
    cookies.set("user_email", props.user_email, { path: "/" });
    cookies.set("user_picture", props.user_picture, { path: "/" });
    cookies.set("access_token", props.access_token, { path: "/" });
    cookies.set("refresh_token", props.refresh_token, { path: "/" });
    window.location.replace(process.env.NEXT_PUBLIC_DOMAIN_NAME!);
  }

  if (props.error_code || props.error_message) {
    return props.error_message;
  }

  return "loading...";
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;

  return {
    props: {
      ...query,
    },
  };
};

export default AuthCallbackSuccessPage;
