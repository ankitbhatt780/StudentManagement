import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function Header() {
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Link to="/login">
              <Button>Home</Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <div className="img">hello</div> */}
    </>
  );
}
export default Header;
