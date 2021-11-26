import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { currentThunk, logoutThunk } from "./redux/thunks";
import {
  useFetchProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} from "./redux/slices";

const isAuth = false;
function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentThunk());
  }, [dispatch]);
  const handleLogout = () => {
    console.log(`click`);
    dispatch(logoutThunk());
  };
  const { data } = useFetchProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [removeProduct] = useRemoveProductMutation();
  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "desc":
        setDesc(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;

      default:
        alert(`Check input name please`);
    }
  };
  const handleSubmit = (e) => {
    e.prevent.default();
    const product = { title, desc, price };
    addProduct(product);
    reset();
  };
  const reset = () => {
    setTitle("");
    setDesc("");
    setPrice("");
  };
  const handleRemove = (e) => {
    removeProduct(e.target.id);
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
        <section>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="title"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="desc"
              value={desc}
              placeholder="desc"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="price"
              value={price}
              placeholder="price"
              onChange={handleChange}
            />
            <br />
            <button type="submit">add</button>
          </form>
          {data &&
            data.map((x) => {
              return (
                <li key={x.id}>
                  {x.title}
                  <button id={x.id} type="button" onClick={handleRemove}>
                    Delete
                  </button>
                </li>
              );
            })}
        </section>

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
