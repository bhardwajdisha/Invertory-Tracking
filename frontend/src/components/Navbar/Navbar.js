import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const MainNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <GrBasket /> Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav className="products-nav">
              <Link to="/products">Products</Link>
            </Nav>
            <Nav.Link eventKey={4} href="#memes">
              User <FaRegUserCircle />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
