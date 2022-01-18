import React, { createContext, useState, useEffect } from "react";
import { removeItem, addItems } from "./inventory.utils";

export const InventoryContext = createContext({
  addInventoryData: () => {},
  inventoryData: [],
  queryString: {},
  removeInventoryData: () => {},
  fetchData: () => {},
  updateInventoryData: () => {},
});

const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState([]);
  const queryString = useState({
    sortBy: null,
    sortOrder: null,
    keyword: " ",
    page: 1,
    totalPages: null,
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    fetch("http://localhost:3001/inventory", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => res.data)
      .then((data) => {
        queryString[0].totalPages = data.meta.totalPages;
        return data.items;
      })
      .then((item) => setInventoryData(item));
    console.log(queryString[0].totalPages);
  };
  const removeInventoryData = (item) =>
    setInventoryData(removeItem(inventoryData, item));

  const addInventoryData = (item) =>
    setInventoryData(addItems(inventoryData, item));

  const updateInventoryData = () => {
    console.log(queryString.keyword);
    console.log(
      `http://localhost:3001/inventory?sortBy=${
        queryString[0].sortBy ? queryString[0].sortBy : " "
      }&sortOrder=${
        queryString[0].sortOrder ? queryString[0].sortOrder : `asc`
      }&page=${queryString[0].page}${
        queryString[0].keyword === " "
          ? ""
          : `&keyword=${queryString[0].keyword}`
      }`
    );
    fetch(
      `http://localhost:3001/inventory?sortBy=${
        queryString[0].sortBy ? queryString[0].sortBy : " "
      }&sortOrder=${
        queryString[0].sortOrder ? queryString[0].sortOrder : `asc`
      }&page=${queryString[0].page}${
        queryString[0].keyword === " "
          ? ""
          : `&keyword=${queryString[0].keyword}`
      }`
    )
      .then((res) => res.json())
      .then((res) => res.data)
      .then((data) => data.items)
      .then((item) => setInventoryData(item));
  };
  return (
    <InventoryContext.Provider
      value={{
        inventoryData,
        removeInventoryData,
        updateInventoryData,
        addInventoryData,
        fetchData,
        queryString,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
