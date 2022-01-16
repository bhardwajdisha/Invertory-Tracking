import React, { createContext, useState, useEffect } from "react";
import { removeItem, addItem } from "./inventory.utils";

export const InventoryContext = createContext({
  addInventoryData: () => {},
  inventoryData: [],
  removeInventoryData: () => {},
});

const InventoryProvider = ({ children }) => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/inventory", { mode: "cors" })
      .then((res) => res.json())
      .then((item) => {
        setInventoryData(item);
      });
  }, [inventoryData]);

  const removeInventoryData = (item) =>
    setInventoryData(removeItem(inventoryData, item));

  const addInventoryData = (item) =>
    setInventoryData(addItem(inventoryData, item));
  return (
    <InventoryContext.Provider
      value={{
        inventoryData,
        removeInventoryData,
        addInventoryData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
//   const CartProvider = ({ children }) => {
//     const [hidden, setHidden] = useState(true);
//     const [cartItems, setCartItems] = useState(cartFromLocalStorage);
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [cartItemTotal, setCartItemTotal] = useState(0);

//     const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
//     const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item));
//     const toggleCartHidden = () => setHidden(!hidden);
//     const clearItemFromCart = (item) => setCartItems(filterItemFromCart(cartItems, item));

//     useEffect(() => {
//       localStorage.setItem('cart', JSON.stringify(cartItems));
//       setCartItemCount(getCartItemCount(cartItems));
//       setCartItemTotal(getCartItemTotal(cartItems));
//     }, [cartItems]);

//     return (
//       <CartContext.Provider
//         value={{
//           hidden,
//           addItem,
//           cartItems,
//           toggleCartHidden,
//           removeItem,
//           cartItemCount,
//           clearItemFromCart,
//           cartItemTotal,
//         }}
//       >
//         {' '}
//         {children}
//         {' '}
//       </CartContext.Provider>
//     );
//   };
//   export default CartProvider;
