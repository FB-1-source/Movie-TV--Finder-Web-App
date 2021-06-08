import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Nav() {
  return (
    <div className="navbar">
      <div className="nav2">
        <div className="logo">
          <h1>Flix &#127909;</h1>
        </div>
        <div className="Links">
          <div className="sbutton">
            <Link style={{ textDecoration: "none" }} to="/Search">
              <Button variant="contained">
                Search <SearchIcon className="icon" />
              </Button>
            </Link>
          </div>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button variant="contained">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
