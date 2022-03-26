const Customer = require("../models/customer.model")

async function getCustomer(req, res, next) {
    let customer;
    try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
        return res.status(404).json({ message: "Cannot find Customer" });
    }
    } catch (err) {
    return res.status(500).json({ message: err.message });
    }
    res.customer = customer;
    next();
  }

module.exports = getCustomer;