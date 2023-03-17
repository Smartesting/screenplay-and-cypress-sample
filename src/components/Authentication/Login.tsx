import React from "react";

import { IClient, AvailableUserIdentifications } from "../../client/IClient";
import { LoginResponse } from "../../core/user/login";
import { LogintestIds } from "./LogintestIds";

export const Login: React.FunctionComponent<{
  client: IClient<AvailableUserIdentifications>;
  onClientResponse: (loginResponse: LoginResponse) => void;
}> = ({ client, onClientResponse }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function login(event: React.FormEvent) {
    event.preventDefault();

    client.login(email, password).then(onClientResponse);
  }

  return (
    <form data-testid={LogintestIds.COMPONENT} onSubmit={login}>
      <label>
        Email:
        <input
          type="text"
          name="login"
          data-testid={LogintestIds.FIELD_EMAIL}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="login"
          data-testid={LogintestIds.FIELD_PASSWORD}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Login"
        data-testid={LogintestIds.ACTION_LOGIN}
      />
    </form>
  );
};
