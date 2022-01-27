import Head from "next/head";
import { Fragment } from "react";
import LoginComponent from "../components/login";

const LoginPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Messenger | ເຂົ້າສູ່ລະບົບ</title>
        <meta name="login" content="ເຂົ້າສູ່ລະບົບ " />
        <link rel="icon" href="/troll.ico" />
      </Head>
      <main>
        <LoginComponent />
      </main>
    </Fragment>
  );
};

export default LoginPage;
