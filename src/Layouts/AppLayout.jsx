import { Navigate, Outlet } from "react-router-dom";
import AppNavbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
// eslint-disable-next-line react/prop-types
const AppLayout = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <AppNavbar />
      <Box minH={"74.5vh"}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default AppLayout;
