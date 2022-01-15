import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import "./Navbar.scss";

const MainNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <GrBasket /> Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#inventory">Products</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Warehouse
            </Nav.Link>
            <Nav.Link eventKey={3} href="#memes">
              Transactions
            </Nav.Link>
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
