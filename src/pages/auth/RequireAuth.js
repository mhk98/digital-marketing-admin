import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to={`${process.env.PUBLIC_URL}/auth-login`} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
