import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Forget,
  Offers,
  Profile,
  CreateList,
} from "./pages";
import { Header, ProtectRoute, AuthRoute } from "./components";

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
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<ProtectRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/createList" element={<ProtectRoute />}>
            <Route path="/createList" element={<CreateList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
