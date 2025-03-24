# Loan-Management-Service
The platform is supposed to extend micro loan products to the Bank customers. Bank customers access bank services through a multi channel Mobile Application (USSD, iOS and Android). The Lending Platform has to be able to extend APIs to the Mobile Application, query the Scoring Engine, and consume data from the CORE Banking System.

## Setting Up Sequelize ORM with PostgreSQL in Node.js

This explains the set up Sequelize as an Object-Relational Mapping (ORM) tool in LMS Node.js project, using PostgreSQL as the database.

### 1. Prerequisites

Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (v12+)
- [PostgreSQL](https://www.postgresql.org/download/)
- NPM (comes with Node.js)

### 2. Install Dependencies

Install the necessary dependencies for Sequelize and PostgreSQL:

```bash
npm install sequelize pg pg-hstore dotenv
```

- **`sequelize`**: The Sequelize library.
- **`pg`**: The PostgreSQL client for Node.js.
- **`pg-hstore`**: A module to serialize and deserialize JSON to PostgreSQL hstore format.
- **`dotenv`**: To manage environment variables.

### 3. Set up Environment Variables

Create a `.env` file in the root of your project to store your database credentials. For example:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
```

## Models for Loan Application System

The system consists of two models:
- **Customer**: Represents a customer in the system, with a unique `customerNumber` provided by the bank.
- **Loan**: Represents loan records associated with a customer.

### 2. Models

#### 2.1. Customer Model

**Model Name**: `Customer`

**Table**: `customer_records`

**Fields and Data Types**:
- `id`: Integer (Primary Key, Auto-incremented)
- `customerNumber`: String (Unique)

#### 2.2. Loan Model

**Model Name**: `Loan`

**Table**: `loan_records`

**Fields and Data Types**:
- `id`: Integer (Primary Key, Auto-incremented)
- `customerId`: Integer (Foreign Key, references `customer_records`)
- `loanAmount`: Float
- `loanStatus`: String (Default: 'active')

### 3. Associations

The models have the following associations:

- A **Loan** belongs to a **Customer**.
- A **Customer** has many **Loans**.

These associations are defined in a separate file (`models/associations.js`).

#### Associations Overview:
- `Loan.belongsTo(Customer)` (foreignKey: 'customerId')
- `Customer.hasMany(Loan)` (foreignKey: 'customerId')


### 4. Additional Notes
- The `timestamps: true` option in both models ensures that Sequelize automatically adds `createdAt` and `updatedAt` fields to the tables.
- The `onDelete: 'CASCADE'` option ensures that if a customer is deleted, all associated loans are automatically removed.

### Customer Controller Documentation


#### **1. `createCustomer`:**
- **Endpoint**: `POST /api/v1/customers`
- **Purpose**: Creates a new customer entry.
- **Description**:
  - Validates the input to ensure `customerNumber` is present.
  - Checks the existence of the customer in the external bank records (via `checkCustomer` middleware).
  - If the customer does not already exist in the system, a new customer record is created.
- **Response**:
  - **201**: Customer successfully created.
  - **400**: Customer already exists or invalid input.
  - **500**: Error adding a new customer.

---

#### **2. `getAllCustomers`:**
- **Endpoint**: `GET /api/v1/customers`
- **Purpose**: Retrieves all customer records along with their associated loans.
- **Description**:
  - Fetches all customers from the `Customer` model.
  - Includes any related `Loan` records for each customer.
- **Response**:
  - **200**: Returns a list of customers with associated loan data.
  - **500**: Error fetching customer data.

---

#### **3. `getCustomer`:**
- **Endpoint**: `GET /api/v1/customers/:id`
- **Purpose**: Retrieves a specific customer’s details based on the provided `id`.
- **Description**:
  - Fetches a customer by primary key (`id`) and includes any associated loans.
  - If the customer is not found, it returns a 404 error.
- **Response**:
  - **200**: Customer details returned successfully.
  - **404**: Customer not found.
  - **500**: Error fetching customer data.

---

This controller interacts with the `Customer` and `Loan` models to perform CRUD operations and fetch necessary details. The `checkCustomer` middleware is used for validating the existence of the customer in the external banking system.

### Loan Controller Documentation


#### **1. `createLoan`:**
- **Endpoint**: `POST /api/v1/loans`
- **Purpose**: Creates a new loan record for a customer.
- **Description**:
  - Validates that `customerNumber` and `loanAmount` are passed in the request.
  - Retrieves the customer record by `customerNumber`.
  - Checks if the customer already has an existing loan. If so, it prevents creating a new loan.
  - Uses `loanStatus` middleware to check the customer's loan eligibility.
  - Creates a new loan record if the customer is eligible and no existing loan is found.
- **Response**:
  - **201**: Loan successfully created.
  - **400**: Missing required data or customer already has a loan.
  - **500**: Error creating loan.

---

#### **2. `getLoan`:**
- **Endpoint**: `GET /api/v1/loans/:id`
- **Purpose**: Fetches a loan record by its ID.
- **Description**:
  - Retrieves a loan by its primary key (`id`) and includes the associated `Customer` data.
  - If the loan is not found, returns a 404 error.
- **Response**:
  - **200**: Loan details successfully returned.
  - **404**: Loan record not found.
  - **500**: Error fetching loan.

---

#### **3. `updateLoan`:**
- **Endpoint**: `PUT /api/v1/loans/:id`
- **Purpose**: Updates the status of an existing loan (placeholder function).
- **Description**:
  - The logic for updating loan status is yet to be implemented, but this method is intended to handle status updates for a customer's loan.
- **Response**:
  - **500**: Currently returns an error due to the incomplete implementation.

---

This controller interacts with the `Loan` and `Customer` models, along with the `loanStatus` middleware, to check loan eligibility and create or retrieve loan records. The controller ensures that a customer cannot take a new loan if they already have an active one.