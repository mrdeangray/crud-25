import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navigation = ({ className }) => {
  const {currUser} = useContext(AuthContext)
  return currUser && <div className={className}>Navigation</div>;
};

export default Navigation;
