import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item active name={user.username} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item
          name="Login"
          active={activeItem === "Login"}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="HiWorld"
          active={activeItem === "HiWorld"}
          onClick={handleClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="Login"
            active={activeItem === "Login"}
            onClick={handleClick}
            as={Link}
            to="/login"
          />

          <Menu.Item
            name="Register"
            active={activeItem === "Register"}
            onClick={handleClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return menuBar;
}

export default MenuBar;
