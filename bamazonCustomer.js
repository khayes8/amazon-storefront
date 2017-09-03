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
  console.log("connected as id " + connection.threadId);

  // showProductsTable();
  takeOrder();
  
  });

// function showProductsTable(err){
// 	connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log("Products Available:");
//     console.log(res);
// });
// };

function takeOrder (){
	inquirer.prompt ([
		{
      type: "input",
      message: "What is the ID of the product that you would like to buy?",
      name: "productID"
    	},
    	 {
      type: "input",
      message: "How many items of this product would you like to buy?",
      name: "productAmount"
    },
		])
	 .then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    // if (inquirerResponse.confirm) {
    //   console.log("\nWelcome " + inquirerResponse.username);
    //   console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    // }
    // else {
    //   console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    // }
    console.log(answer);
  });
}


/* 
*/
