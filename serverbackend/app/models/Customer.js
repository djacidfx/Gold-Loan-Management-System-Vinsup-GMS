const connection = require("../../db");

const Customer = function (customer) {
  this.customer_image = customer.customer_image;
  this.customer_name = customer.customer_name;
  this.date_of_birth = customer.date_of_birth;
  this.gender = customer.gender;
  this.phonenumber = customer.phonenumber;
  this.phonenumber_type = customer.phonenumber_type;
  this.mobile_number = customer.mobile_number;
  this.address_line_one = customer.address_line_one;
  this.address_line_two = customer.address_line_two;
  this.city = customer.city;
  this.state = customer.state;
  this.country = customer.country;
  this.registration_date = customer.registration_date;
  this.care_of_type = customer.care_of_type;
  this.care_of_name = customer.care_of_name;
  this.document1 = customer.document1;
  this.document_type1 = customer.document_type1;
  this.document_copy1 = customer.document_copy1;
  this.expire_date1 = customer.expire_date1;
  this.document_number1 = customer.document_number1;
  this.document2 = customer.document2;
  this.document_type2 = customer.document_type2;
  this.document_copy2 = customer.document_copy2;
  this.expire_date2 = customer.expire_date2;
  this.document_number2 = customer.document_number2;
  this.verified_by=customer.verified_by;
  // Additional customer property for image
};

Customer.createCustomer = function (newCustomer, result) {
  Object.keys(newCustomer).forEach((key) => {
    if (newCustomer[key] === "") {
      newCustomer[key] = "none";
    }
  });
  connection.query("INSERT INTO customer SET ?", newCustomer, (error, res) => {
    if (error) {
      console.log("Error in creating customer: ", error);
      result(error, null);
    } else {
      console.log("Customer created successfully");
      result(null, res.insertId);
    }
  });
};

Customer.getCustomerById = function (customer_id, result) {
  connection.query(
    "SELECT * FROM customer WHERE customer_id = ?",
    customer_id,
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving customer: ", error);
        result(error, null);
      } else {
        if (rows.length === 0) {
          console.log("Customer not found");
          result(null, null);
        } else {
          console.log("Customer retrieved successfully");
          result(null, rows[0]);
        }
      }
    }
  );
};

Customer.getAllCustomers = function (callback) {
  connection.query("SELECT * FROM customer", (error, rows) => {
    if (error) {
      console.log("Error in retrieving customers: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

Customer.deleteCustomerById = function (customerId, result) {
  connection.query(
    "DELETE FROM customer WHERE customer_id = ?",
    [customerId],
    (error, res) => {
      if (error) {
        console.log("Error in deleting customer: ", error);
        result(error, null);
      } else {
        console.log("Customer deleted successfully");
        result(null, res);
      }
    }
  );
};


Customer.updateCustomerById = function (customerId, updatedCustomer, result) {
  Object.keys(updatedCustomer).forEach((key) => {
    if (updatedCustomer[key] === "") {
      updatedCustomer[key] = "none";
    }
  });

  connection.query(
    "UPDATE customer SET ? WHERE customer_id = ?",
    [updatedCustomer, customerId],
    (error, res) => {
      if (error) {
        console.log("Error in updating customer: ", error);
        result(error, null);
      } else {
        console.log("Customer updated successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Customer;
