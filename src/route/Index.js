import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "../layout/Index";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequireAuth from "../pages/auth/RequireAuth";
import Success from "../pages/auth/Success";
import AllUser from "../pages/panel/e-commerce/allUser/AllUser";
import Products from "../pages/panel/e-commerce/products/products";
import Tasks from "../pages/panel/e-commerce/tasks/tasks";


const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        
      

        <Route
          path="all-user"
          element={
            <RequireAuth>
              <AllUser />
            </RequireAuth>
          }
        ></Route>
       

       <Route
          path="products"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        ></Route>

<Route
          path="tasks"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        ></Route>
      </Route>


      <Route path="auth-success" element={<Success />}></Route>
      <Route path="auth-reset" element={<ForgotPassword />}></Route>
      <Route path="auth-register" element={<Register />}></Route>
      <Route path="auth-login" element={<Login />}></Route>

    </Routes>
  );
};
export default Router;
