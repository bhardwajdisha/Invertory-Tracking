# Shopify Backend Challenge

## Description

Inventory tracking web application for shopify backend challenge.

Chosen custom feature: Filtering based on fields/inventory count/tags/other metadata

#

### API Provides :-

- Creating or adding new inventory data.
- Deleting the existing data.
- Updating the existing inventory data.
- Pagination of data
- Filtering and sorting of data can be done according to the given selected field.
  - Product name.
  - Warehouse Number
  - Price
  - Quantity
  - updatedAt

#

### Tools and Technology

- _Front-End_ ReactJS CSS.
- _Back-end:_ NodeJs ExpressJs.
- _Database_ MongoDB.

#

## Setup Instructions

### Backend

If you wish to see an already deployed version, you may do as at: https://inventory-management95.herokuapp.com/inventory

1. Download NodeJS from https://nodejs.org/en/download/
2. Clone this repository. `git clone https://github.com/bhardwajdisha/Invertory-Tracking.git`
3. Move over to Backend folder using `cd .\Backend\`
4. Run `npm i` to install all depdendencies
5. Run `npm start` to run the program.
6. Open `localhost:3001` in your browser and you will see the program in action.

### Frontend

If you wish to see an already deployed version, you may do as at: https://cranky-torvalds-845419.netlify.app/

1. Clone this repository. `git clone https://github.com/bhardwajdisha/Invertory-Tracking.git`
2. Move over to Frontend folder using `cd .\frontend\`
3. Run `npm i` to install all depdendencies
4. Create .env file in the project root with just the following line in there.
   - REACT_APP_URL = http://localhost:3001/inventory
5. Run `npm start` to run the program.
6. Open `localhost:3000` in your browser and you will see the program in action.

**Please ensure that backend is running before starting the frontend server in local machine.**

#

## Schema

**Fields**: In MongoDB, every document `inventoryData` will contain following fields -

- _`itemName`_: string,

- _`Price`_ : Number,

- _`TotalQty`_: Number,

- _`location`_: string,

- _`Updated`_: string,

- _`updatedAt`_: datetime

#

### API Endpoints :-

### 1. To fetch data :-

##### GET /inventory

- All the products available will be display according to limits per-page.
- Default value of perpage is set to 7

### 2. To filter data according to the keyword present :-

##### GET /stream?keyword=**\*\***\_\_**\*\***

- here replace \_\_\_\_ by keywords (name,warehouse No.) you want to search

### 3. To fetch the data according to page Number :-

##### GET /inventory/?page=**\_** & perPage=**\_\_**

- to return a limited number of product :- replace perPage=**\_\_** with an integer value
- to return based on page number :- replace page=\_\_\_\_ with an integer value

### 4. To sort/order the data with respect to a particular field :-

##### GET /inventory/?sortBy=**\_\_\_\_**&sortOrder=**\_\_\_\_**

- sorting can be done according to Price,TotalQty,updated :- replace sortBy=\*\_\_\_\_\_\_ field accordingly
- to return data in ascending order :- replace sortOrder =\*\_\_\_\_\_\_ to asc
- to return data in ascending order :- replace sortOrder =\*\_\_\_\_\_\_ to desc

### 5. To delete data :-

##### DELETE /inventory/delete/:id

- Delete the inventory using product id

### 6. To update the existing data:-

##### PUT /inventory/edit/:id

- Update the inventory data using product id

### 7. To add new product data:-

##### POST /inventory

### Sample Response

```javascript
[
  {
    message: "Inventory Items fetch successfully",
    data: {
      items: [
        {
          _id: "61e5708845b86a4749f77e7c",
          ItemName: "Nescafe Coffee",
          Price: 8,
          TotalQty: 154,
          Location: "Warehouse1",
          Updated: "Tue Jan 18 2022",
          updatedAt: "2022-01-18T11:25:19.199Z",
          __v: 0,
        },
      ],
      meta: {
        total: 2,
        currentPage: 2,
        perPage: 1,
        totalPages: 2,
      },
    },
  },
];
```
