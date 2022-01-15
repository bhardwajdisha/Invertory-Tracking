import React from "react";
import MainNavbar from "../../../components/Navbar/Navbar";
import { Button, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./products.scss";
const data = [
  {
    name: "Pepsi",
    price: 30,
    quantity: 120,
    location: "warhouse1",
    updated: "03/04/2022",
  },
];
const Products = () => {
  return (
    <div className="products container">
      <MainNavbar />
      <div className="products-header">
        <div className="products-header-shadow" />
        <div>
          <h1>Products</h1>
        </div>
        <div className="products-header-link">
          <Button> Add a new product</Button>
          <Button>Filters</Button>
        </div>
      </div>
      <div className="products-inside">
        <Table responsive hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>location</th>
              <th>Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{val.name}</td>
                  <td>{val.quantity}</td>
                  <td>{val.price}</td>
                  <td>{val.location}</td>
                  <td>{val.updated}</td>
                  <td>
                    <button>
                      {" "}
                      <MdDelete />
                    </button>
                    <button>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
