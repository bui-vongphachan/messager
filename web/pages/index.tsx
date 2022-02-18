import Head from "next/head";
import { Fragment } from "react";
import RootHomePageComponent from "../components/home";

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Messenger | ສົ່ງຂໍ້ຄວາມ</title>
        <meta name="home page" content="ສົ່ງຂໍ້ຄວາມ " />
        <link rel="icon" href="/troll.ico" />
      </Head>
      <main>
        <RootHomePageComponent />
      </main>
    </Fragment>
  );
};

export default Home;
