import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentThunk, logoutThunk } from "./redux/thunks";
const isAuth = false;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);
  const handleLogout = () => {
    console.log(`click`);
    dispatch(logoutThunk());
  };
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Switch => Routes
        exact => -
        component => element */}
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute isAuth={isAuth} component={Home} />}
          />
          <Route
            path="/login"
            element={<PublicRoute isAuth={isAuth} component={Login} />}
          />
          <Route
            path="/register"
            element={<PublicRoute isAuth={isAuth} component={Register} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
