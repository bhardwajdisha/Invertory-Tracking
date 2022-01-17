import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { InventoryContext } from "../../providers/inventory.provider";

const AddInventory = () => {
  const [modalShow, setModalShow] = useState(false);
  const { fetchData, addInventoryData } = useContext(InventoryContext);

  const [itemDetails, setItemDetails] = useState({
    _id: null,
    ItemName: "",
    Price: 0,
    TotalQty: 0,
    Location: "",
    Updated: new Date(Date.now()).toDateString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetials) => ({
      ...prevDetials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const date = new Date(Date.now());
    // const Updated = date.toDateString();
    const { ItemName, Price, TotalQty, Location, Updated } = itemDetails;
    fetch(`http://localhost:3001/inventory`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ItemName,
        Price,
        TotalQty,
        Location,
        Updated,
      }),
    });
    console.log(itemDetails);
    await addInventoryData(itemDetails);
    fetchData();
    setModalShow(false);
    setItemDetails({
      _id: null,
      ItemName: "",
      Price: 0,
      TotalQty: 0,
      Location: "",
      Updated: "",
    });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New Product
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="ItemName"
                  placeholder="Item Name"
                  value={itemDetails.ItemName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="qty">Quantity</label>
                <input
                  type="number"
                  id="qty"
                  name="TotalQty"
                  placeholder="Total Quantity"
                  value={itemDetails.TotalQty}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="Price"
                  placeholder="Price"
                  value={itemDetails.Price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="Location"
                  placeholder="Warehouse"
                  value={itemDetails.Location}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit"> Save Changes</Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddInventory;
