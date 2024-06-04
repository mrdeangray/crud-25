import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { currUser } = useContext(AuthContext);

  return <div>{currUser ? <Outlet /> : <Navigate to={`/`} />}</div>;
};

export default PrivateRoutes;
