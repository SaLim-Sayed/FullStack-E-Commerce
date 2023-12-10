import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" sticky top-2 z-50  app-navbar flex justify-between">
      <ul className="flex items-center justify-start gap-8">
        <li className="hover:text-[#149eca] duration-200">
          <NavLink className="px-3 py-2" to="/">
            Home
          </NavLink>
        </li>
        <li className="hover:text-[#149eca] duration-200">
          <NavLink className="px-3 py-2" to="/products">
            Products
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center  justify-end">
        <li className="hover:text-[#149eca] duration-200">
          <NavLink className="px-3 py-2" to="/about">
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
