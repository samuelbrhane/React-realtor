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
  Offers,
  Sale,
  Rent,
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
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Register page */}
          <Route path="/register" element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Login page */}
          <Route path="/login" element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Forget password page */}
          <Route path="/forget" element={<AuthRoute />}>
            <Route path="/forget" element={<Forget />} />
          </Route>

          {/* Profile page */}
          <Route path="/profile" element={<ProtectRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Create listing page */}
          <Route path="/createList" element={<ProtectRoute />}>
            <Route path="/createList" element={<CreateList />} />
          </Route>

          {/* Edit listing page */}
          <Route path="/editList/:id" element={<ProtectRoute />}>
            <Route path="/editList/:id" element={<EditList />} />
          </Route>

          {/* Listing detail info page */}
          <Route path="/details/:type/:id" element={<Details />} />

          {/* Offers page */}
          <Route path="/offers" element={<Offers />} />

          {/* Sale page */}
          <Route path="/sale" element={<Sale />} />

          {/* Rent page */}
          <Route path="/rent" element={<Rent />} />
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
