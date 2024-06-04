import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Header = ({ className }) => {
  const { currUser } = useContext(AuthContext);
  return (
    <div className={className}>
      <h3>CRUD-25</h3>
      <ul>
        <li>Link1</li>
        <li>Link1</li>
        <li>Link1</li>
      </ul>
      <button>{currUser ? currUser.displayName : "Sign In"}</button>
    </div>
  );
};

export default Header;
