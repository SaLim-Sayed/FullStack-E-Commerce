import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Products from "./pages/Products";
import Product from "./components/products/Product";

import Login from "./pages/Login";
import AppLayout from "./Layouts/AppLayout";
import CookieService from "./services/CookieService";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

import HomePage from "./pages";

function App() {
  const token = CookieService.get("jwt");
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout isAuthenticated={token} />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="productDashboard" element={<DashboardProducts />} />

          <Route path="/products/:id" element={<Product />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="categories" element={<h1> categories</h1>} />
        </Route>

        <Route path="/login" element={<Login isAuthenticated={token} />} />
      </Routes>
    </>
  );
}

export default App;
