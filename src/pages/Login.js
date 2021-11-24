import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/thunks";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        alert(`Check input name please`);
    }
  };
  const handlSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(loginThunk(user));
    reset();
  };
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handlSubmit}>
        <input
          type="mail"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
}
// "name": "Adrian Cross",
//   "email": "across@mail.com",
//   "password": "examplepassword"
