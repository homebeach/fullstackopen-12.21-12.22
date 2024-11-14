import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Menu = ({ user, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: "grey" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/blogs" style={{ color: "white", textDecoration: "none" }}>Blogs</Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/users" style={{ color: "white", textDecoration: "none" }}>Users</Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ color: "white" }}>{user.name} logged in</span>
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};


export default Menu;
