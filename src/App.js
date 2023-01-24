import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, Forget, Offers, Profile } from "./pages";
import { Header, ProfileRoute, AuthRoute } from "./components";

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
          <Route path="/profile" element={<ProfileRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
