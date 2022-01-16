export const removeItem = (inventoryData, removeItem) =>
  inventoryData.filter((item) => item._id !== removeItem._id);

export const addItem = (inventoryData, addItem) => {
  return inventoryData.map((item) =>
    item._id === addItem._id ? addItem : item
  );
};
