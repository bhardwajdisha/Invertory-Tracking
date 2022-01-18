import React, { createContext, useState, useEffect } from "react";
import { removeItem, addItems } from "./inventory.utils";

export const InventoryContext = createContext({
  addInventoryData: () => {},
  inventoryData: [],
  queryString: {},
  removeInventoryData: () => {},
  fetchData: () => {},
  updateInventoryData: () => {},
  totalPages: 0,
});

const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState([]);
  let [totalPages, setTotalPages] = useState(0);
  const queryString = useState({
    sortBy: null,
    sortOrder: null,
    keyword: " ",
    page: 1,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:3001/inventory", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => res.data)
      .then((data) => {
        setTotalPages(data.meta.totalPages);
        return data.items;
      })
      .then((item) => setInventoryData(item));
  };

  const removeInventoryData = (item) =>
    setInventoryData(removeItem(inventoryData, item));

  const addInventoryData = (item) =>
    setInventoryData(addItems(inventoryData, item));

  const updateInventoryData = async () => {
    await fetch(
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
      .then((data) => {
        setTotalPages(data.meta.totalPages);
        return data.items;
      })
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
        totalPages,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
