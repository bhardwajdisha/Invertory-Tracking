import React, { useContext } from "react";
import MainNavbar from "../../components/Navbar/Navbar";
import { Button, Table } from "react-bootstrap";
import "./products.scss";
import { InventoryContext } from "../../providers/inventory.provider";
import DeleteInvenotry from "../../components/DeleteInventory/deleteInvenotry";
import EditInventory from "../../components/EditInventory/EditInventory";

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
                      <DeleteInvenotry item={val} />
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
