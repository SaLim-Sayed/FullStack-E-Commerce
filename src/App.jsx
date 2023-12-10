import { Routes, Route  } from "react-router-dom";
import HomePage from "./pages";
import About from "./pages/About";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Product from "./components/products/Product";

function App() {
  return (
    <>
       <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
