import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { InventoryContext } from "../../providers/inventory.provider";

const DeleteInventory = ({ item }) => {
  const [show, setShow] = useState(false);
  const { fetchData, removeInventoryData } = useContext(InventoryContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteInventoryData = async (val) => {
    fetch(`${process.env.REACT_APP_URL}/delete/${val._id}`, {
      method: "DELETE",
      mode: "cors",
    });
    await removeInventoryData(val);
    fetchData();
    setShow(false);
  };
  return (
    <>
      <button onClick={handleShow}>
        <MdDelete />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item : {item.ItemName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteInventoryData(item)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteInventory;
