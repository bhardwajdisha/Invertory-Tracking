import React, { useContext } from "react";
import MainNavbar from "../../components/Navbar/Navbar";
import { Button, Table, Form, FormControl } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "./products.scss";
import { InventoryContext } from "../../providers/inventory.provider";
import DeleteInventory from "../../components/DeleteInventory/deleteInventory";
import EditInventory from "../../components/EditInventory/EditInventory";
import AddInventory from "../../components/AddInventory/AddInventory";

const Products = () => {
  const { inventoryData } = useContext(InventoryContext);
  return (
    <div className="products container">
      <MainNavbar />
      <div className="products-header">
        <div className="products-header-shadow" />
        <div>
          <h1>Products</h1>
        </div>
        <div className="products-header-link">
          <div>
            <Form className="d-flex search-form">
              <AiOutlineSearch className="search-icon" />
              <FormControl
                type="search"
                placeholder="Search by name"
                className="me-2"
                aria-label="Search"
                // onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </Form>
          </div>
          <Button>Filters</Button>
          <div>
            <AddInventory />
          </div>
        </div>
      </div>
      <div className="products-inside">
        <Table responsive hover striped>
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
            {inventoryData.map((val, key) => {
              return (
                <tr key={val._id}>
                  <td>{key + 1}</td>
                  <td>{val.ItemName}</td>
                  <td>{val.TotalQty}</td>
                  <td>{val.Price}</td>
                  <td>{val.Location}</td>
                  <td>{val.Updated}</td>
                  <td>
                    <div>
                      <DeleteInventory item={val} />
                    </div>
                    <div>
                      <EditInventory item={val} />
                    </div>
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
