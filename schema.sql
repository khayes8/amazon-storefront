CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products ( 
	id INTEGER (100) AUTO_INCREMENT NOT NULL,
    item_id VARCHAR (50),
    product_name VARCHAR (50),
    department_name VARCHAR (50),
    price INTEGER (20),
    stock_quantity INTEGER (100),
    PRIMARY KEY (id)
    );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("03", "Soylent Meal Replacement", "Grocery & Gourmet Food", 37 , 0);

SELECT * FROM products;
