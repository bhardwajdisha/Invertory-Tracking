export const removeItem = (inventoryData, removeItem) =>
  inventoryData.filter((item) => item._id !== removeItem._id);

export const addItems = (inventoryData, addItem) => {
  const existingItem = inventoryData.find((item) => item._id === addItem._id);
  if (existingItem) {
    return inventoryData.map((item) =>
      item._id === addItem._id ? addItem : item
    );
  }
  return [...inventoryData, addItem];
};
