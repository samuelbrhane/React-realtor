import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Header } from "./components";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
