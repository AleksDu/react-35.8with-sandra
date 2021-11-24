import { Navigate } from "react-router-dom";
export function PrivateRoute({ isAuth, component: C }) {
  return (
    <>
      <h1>PRIVATE</h1>
      {isAuth ? <C /> : <Navigate to="/login" />}
    </>
  );
}
