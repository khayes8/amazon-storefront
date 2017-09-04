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
		var price = "$" +(answer.amt * res[i].price)+ ".00";
		var item = res[i].product_name;
		var itemID = answer.id;
		var amountRequested = answer.amt;
		var amountInStock= res[i].stock_quantity;
     	// console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
     	// console.log("----------------------------------------------")
     	// console.log("Your Order: ")
     	// console.log("Item: " + res[i].product_name + "\nPrice: " + price);
     	if (amountRequested > amountInStock){
		console.log("Insufficient Quantity");
		inputOrder();
		}
		else {
     	placeOrder(item, amountRequested, amountInStock, price, itemID);
     }
      	// if (answer.amt > res[i].stock_quantity){
      	// 	console.log("insufficient quantity");
      	// }
    }
    })
  });
};

function placeOrder(item, amountRequested, amountInStock, price, itemID){	
	var order = {
		item: item,
		amount: amountRequested,
		price: price,
		id: itemID
	}
	 var orderArr = [];
	orderArr.push(order);
	console.log("Overview of your order: ")
	console.log(orderArr);
}

function updateDatebase (item, amountRequested, amountInStock, price, itemID){
	
}


















/* 
CONDITIONS
if input value for product is an two integer:
if input value for product id is not an integer:
if id of product is correct and there is enough of product, place an order
place an order = store that info into an order array? 
if id is incorrect:
if order is out of stock:
*/