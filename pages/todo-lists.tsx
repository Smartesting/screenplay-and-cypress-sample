import React from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { HttpClient } from "../src/client/HttpClient";
import { ToDoListCreationForm } from "../src/components/ToDoLists/CreateForm";
import { ToDoLists } from "../src/components/ToDoLists/List";
import { JwtUserIdentification } from "../src/types";

const ToDoListComponent: React.FunctionComponent = () => {
  const client = new HttpClient("http://localhost:3000");
  const [userIdentification, setUserIdentification] =
    React.useState<JwtUserIdentification>();

  React.useEffect(() => {
    if (userIdentification) return;

    setUserIdentification(
      JSON.parse(window.sessionStorage.getItem("userIdentification") ?? "{}")
    );
  });

  if (!userIdentification) return <></>;
  return (
    <>
      <ToDoListCreationForm
        client={client}
        userIdentification={userIdentification}
      />
      <ToDoLists client={client} userIdentification={userIdentification} />
    </>
  );
};

export default function ToDoListsPage() {
  const client = new HttpClient("http://localhost:3000");

  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo Lists</title>
      </Head>
      <main>
        Welcome :)
        <ToDoListComponent />
      </main>
    </div>
  );
}
