import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MenuBar() {
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleClick = (e, { name }) => setActiveItem(name);

  return (
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
}

export default MenuBar;
