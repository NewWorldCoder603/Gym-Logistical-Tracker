const router = require("express").Router();
const mysql = require("mysql");

// Connect to the gym_management_systemdb database using a localhost connection
const connection = mysql.createConnection({
  host: "localhost",

  // Your port, if not 3306
  port: 3306,

  // Your MySQL username
  user: "root",

  // Your MySQL password (leave blank for class demonstration purposes; fill in later)
  password: "Jesterman17!",

  // Name of database
  database: "gym_management_systemdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// GET "/api/classes" responds with all classes from the database
router.get("/classes", (req, res) => {
  connection.query(
    "SELECT * FROM class",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// POST "api/login" authenticates the member login credentials in the database, and responds with the personal details of the member
router.post("/login", (req, res) => {
    const data = req.body;
    // retrieves the record from database if username and password combination entered by the user matches with the existing records in the database
    connection.query(`SELECT * from member WHERE username = "${data.username}" AND password = MD5("${data.password}")`, 
    function(err, result){
        if (err) throw err;
        // if the result-set has exactly 1 record, then pass on the member details(database query response) to front-end, else send an error message
        result.length === 1? res.json(result[0]): res.json({"error": "Username and/or password is incorrect. Please try again."});
    })
});

// router.get("/products-low", (req, res) => {
//   connection.query(
//     "SELECT * FROM products WHERE stock_quantity > 10",
//     function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// });

// router.put("/products", (req, res) => {
//   console.log(req.body);
//   connection.query(
//     "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
//     [
//       parseInt(req.body.purchaseNumber),
//       parseInt(req.body.id),
//     ],
//     function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
//   res.send("ok");
// });

// router.get("/department", (req, res) => {
//   console.log(req.body);
//   connection.query(
//     "SELECT * FROM departments",
//     function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// });

// router.post("/addNewItem", (req, res) => {
//   connection.query(
//     `INSERT INTO products (product_name, department_name, price, stock_quantity)
//     VALUES ("${req.body.product}",  "${
//       req.body.department
//     }", ${parseInt(req.body.price)}, ${parseInt(
//       req.body.quantity
//     )});`,
//     function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// });

// router.put("/addInventory", (req, res) => {
//   connection.query(
//     `UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?`,
//     [parseInt(req.body.addNumber), parseInt(req.body.id)],
//     function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// });

module.exports = router;
