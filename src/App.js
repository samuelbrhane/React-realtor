import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Register, Login, Forget, Offers } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
