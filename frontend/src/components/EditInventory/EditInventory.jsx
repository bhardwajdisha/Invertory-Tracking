import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { InventoryContext } from "../../providers/inventory.provider";
import "../AddInventory/AddInventory.scss";

const EditInventory = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);
  const { fetchData, addInventoryData } = useContext(InventoryContext);

  const [itemDetails, setItemDetails] = useState({
    _id: item._id,
    ItemName: item.ItemName,
    Price: item.Price,
    TotalQty: item.TotalQty,
    Location: item.Location,
    Updated: new Date(Date.now()).toDateString(),
    updatedAt: new Date(Date.now()),
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
    const { ItemName, Price, TotalQty, Location } = itemDetails;
    fetch(`${process.env.REACT_APP_URL}/edit/${item._id}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ItemName,
        Price,
        TotalQty,
        Location,
      }),
    });
    await addInventoryData(itemDetails);
    fetchData();
    setModalShow(false);
  };

  return (
    <>
      <button variant="primary" onClick={() => setModalShow(true)}>
        <FaEdit />
      </button>
      <Modal
        show={modalShow}
        size="lg"
        className="products-modal"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit item {item.ItemName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="products-modal-body">
          <div>
            <form className="products-modal-body-form" onSubmit={handleSubmit}>
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
              <div className="products-modal-body-form-savebutton">
                <Button variant="success" type="submit">
                  {" "}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setModalShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditInventory;
