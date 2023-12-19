const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const Customer = require("../models/Customer");
require('dotenv').config();

// Configure AWS SDK with your access credentials
const AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY;
const REGION=process.env.REGION;

aws.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region:REGION,
});

// Create an S3 service object
const s3 = new aws.S3();

exports.addCustomer = async (req, res) => {
  try {
    // Extract data from request body
    const {
      customer_name,
      date_of_birth,
      gender,
      phonenumber,
      phonenumber_type,
      mobile_number,
      email,
      address_line_one,
      address_line_two,
      city,
      state,
      country,
      registration_date,
      care_of_type,
      care_of_name,
      document1,
      document_type1,
      expire_date1,
      document_number1,
      document2,
      document_type2,
      expire_date2,
      document_number2,
      verified_by,
    } = req.body;

    // Extract uploaded files
    const customer_image = req.files && req.files["customer_image"]
      ? req.files["customer_image"][0]
      : undefined;
    const document_copy1 = req.files && req.files["document_copy1"]
      ? req.files["document_copy1"][0]
      : undefined;
    const document_copy2 = req.files && req.files["document_copy2"]
      ? req.files["document_copy2"][0]
      : undefined;

    // Generate unique file names
    const customerImageName = customer_image
      ? `${uuidv4()}-${customer_image.originalname}`
      : "none";
    const documentCopy1Name = document_copy1
      ? `${uuidv4()}-${document_copy1.originalname}`
      : "none";
    const documentCopy2Name = document_copy2
      ? `${uuidv4()}-${document_copy2.originalname}`
      : "none";

    // Upload files to AWS S3 bucket
    const uploadImagePromise = customer_image
      ? uploadFile(customer_image, customerImageName)
      : Promise.resolve();
    const uploadDocumentCopy1Promise = document_copy1
      ? uploadFile(document_copy1, documentCopy1Name)
      : Promise.resolve();
    const uploadDocumentCopy2Promise = document_copy2
      ? uploadFile(document_copy2, documentCopy2Name)
      : Promise.resolve();

    // Wait for all file uploads to complete
    await Promise.all([
      uploadImagePromise,
      uploadDocumentCopy1Promise,
      uploadDocumentCopy2Promise,
    ]);

   

    // Create a new Customer object
    const newCustomer = new Customer({
      customer_image: customerImageName,
      customer_name,
      date_of_birth,
      gender,
      phonenumber,
      phonenumber_type,
      mobile_number,
      email,
      address_line_one,
      address_line_two,
      city,
      state,
      country,
      registration_date,
      care_of_type,
      care_of_name,
      document1,
      document_type1,
      document_copy1: documentCopy1Name,
      expire_date1,
      document_number1,
      document2,
      document_type2,
      document_copy2: documentCopy2Name,
      expire_date2,
      document_number2,
      verified_by,
    });

    // Save the customer to the database
    Customer.createCustomer(newCustomer, (err, customer) => {
      if (err) {
        console.error("Error creating customer:", err);
        return res.status(500).json({ error: "Failed to create customer" });
      }

      // Create the image URLs
      const customerImageUrl = getPresignedUrl(customerImageName);
      const documentCopy1Url = getPresignedUrl(documentCopy1Name);
      const documentCopy2Url = getPresignedUrl(documentCopy2Name);

      // Add the image URLs to the customer object
      const customerWithUrls = {
        ...customer,
        customer_image: customerImageUrl,
        document_copy1: documentCopy1Url,
        document_copy2: documentCopy2Url,
      };

      res.status(201).json({
        message: "Customer created successfully",
        customer: customerWithUrls,
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const { customer_image, document_copy1, document_copy2 } = req.files;
    [customer_image, document_copy1, document_copy2].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getCustomer = (req, res) => {
  const customerId = req.params.id;

  Customer.getCustomerById(customerId, (err, customer) => {
    if (err) {
      console.error("Error retrieving customer:", err);
      return res.status(500).json({ error: "Failed to retrieve customer" });
    }

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Create the image URLs
    const customerImageUrl = getPresignedUrl(customer.customer_image);
    const documentCopy1Url = getPresignedUrl(customer.document_copy1);
    const documentCopy2Url = getPresignedUrl(customer.document_copy2);

    // Add the image URLs to the customer object
    const customerWithUrls = {
      ...customer,
      customer_image: customerImageUrl,
      document_copy1: documentCopy1Url,
      document_copy2: documentCopy2Url,
    };

    res.status(200).json({
      message: "Customer retrieved successfully",
      customer: customerWithUrls,
    });
  });
};

exports.getAllCustomers = (req, res) => {
  Customer.getAllCustomers((err, customers) => {
    if (err) {
      console.error("Error retrieving customers:", err);
      return res.status(500).json({ error: "Failed to retrieve customers" });
    }

    // Create the image URLs for all customers
    const customersWithUrls = customers.map((customer) => {
      const customerImageUrl = getPresignedUrl(customer.customer_image);
      const documentCopy1Url = getPresignedUrl(customer.document_copy1);
      const documentCopy2Url = getPresignedUrl(customer.document_copy2);

      return {
        ...customer,
        customer_image: customerImageUrl,
        document_copy1: documentCopy1Url,
        document_copy2: documentCopy2Url,
      };
    });

    res.status(200).json({ customers: customersWithUrls });
  });
};

exports.updateCustomer = (req, res) => {
  const customerId = req.params.id;
  const updatedCustomer = req.body;

  // Remove the customer_id property from the updatedCustomer object
  delete updatedCustomer.customer_id;

  Customer.updateCustomerById(customerId, updatedCustomer, (err, data) => {
    if (err) {
      console.error("Error updating customer:", err);
      return res.status(500).json({ error: "Failed to update customer" });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  });
};

exports.deleteCustomer = (req, res) => {
  const customerId = req.params.id;

  Customer.deleteCustomerById(customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found customer with id ${customerId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete customer with id ${customerId}`,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

const BUCKET=process.env.BUCKET;

// Helper function to upload file to AWS S3 bucket
function uploadFile(file, fileName) {
  const fileContent = fs.readFileSync(file.path);

  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Body: fileContent,
  };

  return s3.upload(params).promise();
}

// Helper function to get pre-signed URL for file retrieval from AWS S3 bucket
function getPresignedUrl(fileName) {
  const params = {
    Bucket: BUCKET,
    Key: fileName,
    Expires: 3600, // URL expiration time in seconds
  };

  return s3.getSignedUrl("getObject", params);
}
