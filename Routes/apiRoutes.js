const router = require("express").Router();
const mysql = require("mysql");

// Connect to the ice_creamDB database using a localhost connection
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

// GET "/api/classes" responds with all notes from the database
router.get("/classes", (req, res) => {
  connection.query(
    "SELECT * FROM class",
    function (err, result) {
      if (err) throw err;

      res.json(result);
    }
  );
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
