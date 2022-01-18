import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../components/Navbar/Navbar";
import { Button, Table, Form, FormControl } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import "./products.scss";
import { InventoryContext } from "../../providers/inventory.provider";
import DeleteInventory from "../../components/DeleteInventory/deleteInventory";
import EditInventory from "../../components/EditInventory/EditInventory";
import AddInventory from "../../components/AddInventory/AddInventory";
import FilterData from "../../components/FilterInventory/FilterData";

const Products = () => {
  const { inventoryData, queryString, updateInventoryData } =
    useContext(InventoryContext);
  const [search, setSearch] = useState(" ");

  useEffect(() => {
    updateInventoryData();
  }, [search]);

  const setSearchTerm = (e) => {
    setSearch(e);
    queryString[0].keyword = e;
    console.log(queryString[0].keyword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInventoryData();
  };

  return (
    <div className="products container">
      <MainNavbar />
      <div className="products-header">
        <div className="products-header-shadow" />
        <div>
          <h1>Products</h1>
        </div>
        <div className="products-header-link">
          <div className="products-header-link-formDiv">
            <Form className="d-flex search-form" onSubmit={handleSubmit}>
              <AiOutlineSearch className="search-icon" />
              <FormControl
                type="search"
                placeholder="Search by name or Warehouse No. 1,2,3"
                className="search-form-input"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </div>
          <div className="products-header-link-buttons">
            <div className="products-header-link-buttons-filter">
              {/* <Button>Filters</Button> */}
              <FilterData />
            </div>
            <div>
              <AddInventory />
            </div>
          </div>
        </div>
      </div>
      <div className="products-inside">
        <Table
          className="products-inside-productTable"
          responsive
          hover
          striped
        >
          <thead>
            <tr className="table-row1">
              <th>S.No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>location</th>
              <th>Last Modified</th>
              <th className="tableBtns"></th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((val, key) => {
              return (
                <tr key={val._id} className="table-row2">
                  <td className="table-sno">{key + 1}</td>
                  <td>{val.ItemName}</td>
                  <td>{val.TotalQty}</td>
                  <td>{val.Price}</td>
                  <td>{val.Location}</td>
                  <td>{val.Updated}</td>
                  <td className="table-deleteEdit">
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
      <div className="products-pagination">Hello</div>
    </div>
  );
};

export default Products;
