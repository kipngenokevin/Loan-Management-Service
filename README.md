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