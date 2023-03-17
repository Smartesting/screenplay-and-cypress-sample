import React from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Login } from "../src/components/Authentication/Login";
import { HttpClient } from "../src/client/HttpClient";
import { LoginResponse } from "../src/core/user/login";
import { useRouter } from "next/navigation";

const HomeComponent: React.FunctionComponent = () => {
  const client = new HttpClient("http://localhost:3000");
  const [loginResponse, setLoginResponse] = React.useState<LoginResponse>();
  const router = useRouter();

  React.useEffect(() => {
    if (!loginResponse) return;

    if (loginResponse.jwtIdentification) {
      window.sessionStorage.setItem(
        "userIdentification",
        JSON.stringify(loginResponse.jwtIdentification)
      );
      router.push("/todo-lists");
    }
  }, [loginResponse]);

  return <Login client={client} onClientResponse={setLoginResponse} />;
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo Lists</title>
      </Head>
      <HomeComponent />
    </div>
  );
}
