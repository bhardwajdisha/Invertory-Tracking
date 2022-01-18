import React, { useContext } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { InventoryContext } from "../../providers/inventory.provider";
import "./FilterData.scss";

const filterData = [
  {
    id: "TotalQty",
    name: "Quantity",
  },
  {
    id: "Price",
    name: "Price",
  },
  {
    id: "updated",
    name: "updation",
  },
];
const FilterData = () => {
  const { updateInventoryData, queryString } = useContext(InventoryContext);
  const handleClick = (item, order) => {
    queryString[0].sortBy = item.id;
    queryString[0].sortOrder = order;
    updateInventoryData();
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-button-example1"
        className="dropdown-filter"
      >
        Filters
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        {filterData.map((item) => (
          <DropdownButton
            className="dropdown-subBtns"
            key={item.id}
            id={item.id}
            menuVariant="dark"
            drop="end"
            variant="secondary"
            title={`Sort by ${item.name}`}
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => handleClick(item, "desc")}
            >
              Descending
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => handleClick(item, "asc")}
            >
              Ascending
            </Dropdown.Item>
          </DropdownButton>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterData;
