var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Dixie#11",
  database: "bamazon_db"
});

connection.connect(function(err, res) {
  if (err) throw err;
  // selectAll();
  inputOrder();
  
  });

// function selectAll(){
// 	connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
// });
// };

function inputOrder (){
	inquirer.prompt ([
		{
      type: "input",
      message: "What is the ID of the product that you would like to buy?",
      name: "id"
    	},
    	 {
      type: "input",
      message: "How many items of this product would you like to buy?",
      name: "amt"
    },
		])
	 .then(function(answer) {
	connection.query("SELECT * FROM products WHERE id=?", [answer.id], function(err, res) {
		for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    })
  });
};




















/* 
CONDITIONS
if input value for product is an two integer:
if input value for product id is not an integer:
if id of product is correct and there is enough of product, place an order
place an order = store that info into an order array? 
if id is incorrect:
if order is out of stock:
*/