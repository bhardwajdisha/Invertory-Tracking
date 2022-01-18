import React from "react";
import "./homepage.scss";
import { Link } from "react-router-dom";
import MainNavbar from "../../components/Navbar/Navbar";
import { Button } from "react-bootstrap";
const Homepage = () => {
  return (
    <div className="homepage">
      <MainNavbar />
      <section id="main">
        <div className="main-text">
          <span>Inventory Manager</span> <br />
          Manage your Inventory <br />
          in the most efficient way
          <div className="homepage-clicks">
            <Link to="/products">
              <Button> Products </Button>
            </Link>
          </div>
        </div>
        <div className="homepage-icon">
          <iframe
            title="icon"
            className="homepage-icon-cart"
            src="https://embed.lottiefiles.com/animation/36605"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
