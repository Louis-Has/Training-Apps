// import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useInput } from "./hooks";

export default function Login() {
  let name = useInput();
  let password = useInput();
  let history = useHistory();

  async function login() {
    let info = {
      name: name.value.value,
      password: password.value.value,
    };

    try {
      await axios
        .post("/account/login", info)
        .then(() => history.push("/webapp"));
      // .then(() => (window.location.href = "/webapp"));
    } catch (e) {
      //请求码大于400  或  网络原因直接失败
      alert(e);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        Username:
        <input type="text" {...name.value} />
      </div>
      <div>
        Password:
        <input type="password" {...password.value} />
      </div>
      <button onClick={login}>登陆</button>
    </div>
  );
}
