# E-Commerce BackEnd

## Description
This project was completed as a part of the Adelaide University Web Development Bootcamp. The main motivation was to create a BackEnd that resembled that of an E-commerce website. The backend would interact with the database to request data, create data, update data and delete data. This was all completed using Sequelize, taking advantage of Object Relational Mapping. 

This specific E-Commerece backend allows the user to keep track of Products, Categories and Tags. 

The main skill gained from this project was understanding how to sync Sequelize to the database, create Models and how to execute CRUD commands to the database with the assistance of Sequelize. 

Access the following link for a video demonstration of this application: https://drive.google.com/file/d/1l48Rkit5jAFaif7_ONc8uRANU1mIZ4pv/view?usp=sharing 

## Installation
In order to run this application you will first need to clone the GitHub repository to your local computer.

Then, after navigating to the root directory within the terminal. Execute 'npm i' to install all necessary packages.

You will then need to create a dotenv file to store the following variables: DB_NAME, DB_USER, DB_PW

You will need to create a database within sql. Once logged into sql use "SOURCE db/schema.sql" to create the database.

Once you have created your database. Seed the database using "npm seed". Feel free to adjust the seeding data to your needs before executing this command.

Finally, run the server using 'node server.js' and your application should be listining.

## Usage
Access the following link for a video demonstration of this application: https://drive.google.com/file/d/1l48Rkit5jAFaif7_ONc8uRANU1mIZ4pv/view?usp=sharing 

Once you have the node server running on your local computer. You can Execute any of the following requests through an API Development Platform such as Insomnia. Just append the following paths to your local host server link. Replace any instance of ":id" with the specific Product/Category/Tag's ID:

Category Requests:
- Get all Categories - (GET) /api/categories/
- Get Category by ID - (GET) /api/categories/:id
- Create Category - (POST) /api/categories/
- Update Category - (PUT) /api/categories/:id
- Delete Category - (DELETE) /api/categories/:id

Product Requests:
- Get all Products - (GET) /api/products/
- Get Product by ID - (GET) /api/products/:id
- Create Product - (POST) /api/products/
- Update Product - (PUT) /api/products/:id
- Delete Product - (DELETE) /api/products/:id

Product Requests:
- Get all Tags - (GET) /api/tags/
- Get Tag by ID - (GET) /api/tags/:id
- Create Tag - (POST) /api/tags/
- Update Tag - (PUT) /api/tags/:id
- Delete Tag - (DELETE) /api/tags/:id

Completion of the above requests will be confirmed by the server response.
