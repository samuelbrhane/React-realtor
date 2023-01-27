import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Forget,
  Profile,
  CreateList,
  Details,
  EditList,
} from "./pages";
import { Header, ProtectRoute, AuthRoute } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/login" element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/forget" element={<Forget />} />
          <Route path="/profile" element={<ProtectRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/createList" element={<ProtectRoute />}>
            <Route path="/createList" element={<CreateList />} />
          </Route>
          <Route path="/details/:type/:id" element={<ProtectRoute />}>
            <Route path="/details/:type/:id" element={<Details />} />
          </Route>
          <Route path="/editList/:id" element={<ProtectRoute />}>
            <Route path="/editList/:id" element={<EditList />} />
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </main>
  );
};

export default App;
