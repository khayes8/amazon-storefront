var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
    selectAll();
    // inputOrder(); 
});

function selectAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("PRODUCTS:")
        console.table(res);
        // console.log(res);
        confirmInterest();
    });
};

function confirmInterest() {
    inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Would you like to order something?'
        }])
        .then(function(answer) {
            if (answer.confirm === true) {
                inputOrder();
            } 
            else if (answer.confirm === false) {
                console.log("Thank you, come again another time!");
            }
        })
}

function inputOrder() {
    inquirer.prompt([{
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
                    var price = "$" + (answer.amt * res[i].price) + ".00";
                    var item = res[i].product_name;
                    var itemID = answer.id;
                    var amountRequested = answer.amt;
                    var amountInStock = res[i].stock_quantity;
                    // console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                    if (amountRequested > amountInStock) {
                        console.log("Insufficient Quantity");
                        inputOrder();
                    } else if (amountRequested <= amountInStock){
                        placeOrder(item, amountRequested, amountInStock, price, itemID);
                    }
                      else {
                        console.log("This is not valid input, please type in a number.");
                      }
                    // if (answer.amt > res[i].stock_quantity){
                    //  console.log("insufficient quantity");
                    // }
                }
            })
        });
};

function placeOrder(item, amountRequested, amountInStock, price, itemID) {
    var order = {
        item: item,
        amount: amountRequested,
        price: price,
        id: itemID
    }
    var orderArr = [];
    var newAmt = amountInStock - amountRequested;
    orderArr.push(order);
    console.log("Overview of your order: ")
    // console.log(orderArr);
    updateDatabase(itemID, newAmt);
    console.log(newAmt);
    console.log(orderArr);
}

function updateDatabase(itemID, newAmt) {
    connection.query("UPDATE products SET stock_quantity =? WHERE id=?", [newAmt, itemID], function(err, res) {
        console.log("This is your updated database:")
        connection.query("SELECT * FROM products WHERE id=?", [itemID], function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
            }
        })
    })
    confirmInterest();
    selectALL();
}



