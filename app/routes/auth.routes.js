const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt")
const getCustomer = require("../middleware/obtainCustomer")
const db = require("../models");
const Customer = db.customer;
module.exports = function(app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/sig",
    [
      verifySignUp.checkDuplicatenameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/signin", controller.signin);

  app.get("/customers", async (req, res) => {
    try {
      const customer = await Customer.find();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.delete(
    "/customer/:id",
    [getCustomer, authJwt.verifyToken],
    async (req, res) => {
      try {
        await res.customer.remove();
        res.json({ message: "Deleted customer" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  );
};
