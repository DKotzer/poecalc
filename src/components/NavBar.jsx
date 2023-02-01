import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }
  return (
    <nav>
      <Link to='/orders'>Account</Link>
      &nbsp; | &nbsp;
      <Link to='/emulator'>Emulator</Link>
      &nbsp; |&nbsp;
      <Link to='/calculator'>Calculator</Link>
      &nbsp; |&nbsp;
      {user ? `Hello ${user.name}` : "Sign Up"}
      &nbsp; |&nbsp;
      {user && (
        <Link to='' onClick={handleLogOut}>
          Log Out
        </Link>
      )}
    </nav>
  );
}
