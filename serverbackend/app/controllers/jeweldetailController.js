const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const aws = require("aws-sdk");
const JewelDetail = require("../models/JewelDetail");
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

exports.addJewelDetail = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request params:", req.params);
  console.log("Request query:", req.query);
  try {
    // Extract data from request body
    const {
      loan_id,
      jewel_type,
      purity,
      count,
      gross_weight,
      stone,
      wastage,
      net_weight,
      jewel_type1,
      purity1,
      count1,
      gross_weight1,
      stone1,
      wastage1,
      net_weight1,
      jewel_type2,
      purity2,
      count2,
      gross_weight2,
      stone2,
      wastage2,
      net_weight2,
      jewel_type3,
      purity3,
      count3,
      gross_weight3,
      stone3,
      wastage3,
      net_weight3,
      jewel_type4,
      purity4,
      count4,
      gross_weight4,
      stone4,
      wastage4,
      net_weight4,
      // Details for Jewel 5
      jewel_type5,
      purity5,
      count5,
      gross_weight5,
      stone5,
      wastage5,
      net_weight5,
      // Details for Jewel 6
      jewel_type6,
      purity6,
      count6,
      gross_weight6,
      stone6,
      wastage6,
      net_weight6,
      // Details for Jewel 7
      jewel_type7,
      purity7,
      count7,
      gross_weight7,
      stone7,
      wastage7,
      net_weight7,
      // Details for Jewel 8
      jewel_type8,
      purity8,
      count8,
      gross_weight8,
      stone8,
      wastage8,
      net_weight8,
      // Details for Jewel 9
      jewel_type9,
      purity9,
      count9,
      gross_weight9,
      stone9,
      wastage9,
      net_weight9,
      // Details for Jewel 10
      jewel_type10,
      purity10,
      count10,
      gross_weight10,
      stone10,
      wastage10,
      net_weight10,
    } = req.body;

    const jewel_photo =
      req.files && req.files["jewel_photo"]
        ? req.files["jewel_photo"][0]
        : undefined;
    const jewel_photo1 =
      req.files && req.files["jewel_photo1"]
        ? req.files["jewel_photo1"][0]
        : undefined;
    const jewel_photo2 =
      req.files && req.files["jewel_photo2"]
        ? req.files["jewel_photo2"][0]
        : undefined;
    const jewel_photo3 =
      req.files && req.files["jewel_photo3"]
        ? req.files["jewel_photo3"][0]
        : undefined;
    const jewel_photo4 =
      req.files && req.files["jewel_photo4"]
        ? req.files["jewel_photo4"][0]
        : undefined;
    const jewel_photo5 =
      req.files && req.files["jewel_photo5"]
        ? req.files["jewel_photo5"][0]
        : undefined;
    const jewel_photo6 =
      req.files && req.files["jewel_photo6"]
        ? req.files["jewel_photo6"][0]
        : undefined;
    const jewel_photo7 =
      req.files && req.files["jewel_photo7"]
        ? req.files["jewel_photo7"][0]
        : undefined;
    const jewel_photo8 =
      req.files && req.files["jewel_photo8"]
        ? req.files["jewel_photo8"][0]
        : undefined;
    const jewel_photo9 =
      req.files && req.files["jewel_photo9"]
        ? req.files["jewel_photo9"][0]
        : undefined;
    const jewel_photo10 =
      req.files && req.files["jewel_photo10"]
        ? req.files["jewel_photo10"][0]
        : undefined;

    // Generate unique file names
    const JewelPhoto = jewel_photo
      ? `${uuidv4()}-${jewel_photo.originalname}`
      : null;
    const JewelPhoto1 = jewel_photo1
      ? `${uuidv4()}-${jewel_photo1.originalname}`
      : null;
    const JewelPhoto2 = jewel_photo2
      ? `${uuidv4()}-${jewel_photo2.originalname}`
      : null;
    const JewelPhoto3 = jewel_photo3
      ? `${uuidv4()}-${jewel_photo3.originalname}`
      : null;
    const JewelPhoto4 = jewel_photo4
      ? `${uuidv4()}-${jewel_photo4.originalname}`
      : null;
    const JewelPhoto5 = jewel_photo5
      ? `${uuidv4()}-${jewel_photo5.originalname}`
      : null;
    const JewelPhoto6 = jewel_photo6
      ? `${uuidv4()}-${jewel_photo6.originalname}`
      : null;
    const JewelPhoto7 = jewel_photo7
      ? `${uuidv4()}-${jewel_photo7.originalname}`
      : null;
    const JewelPhoto8 = jewel_photo8
      ? `${uuidv4()}-${jewel_photo8.originalname}`
      : null;
    const JewelPhoto9 = jewel_photo9
      ? `${uuidv4()}-${jewel_photo9.originalname}`
      : null;
    const JewelPhoto10 = jewel_photo10
      ? `${uuidv4()}-${jewel_photo10.originalname}`
      : null;

    // Upload files to AWS S3 bucket if they exist
    const uploadJewelPhotoPromise = jewel_photo
      ? uploadFile(jewel_photo, JewelPhoto)
      : Promise.resolve();
    const uploadJewelPhoto1Promise = jewel_photo1
      ? uploadFile(jewel_photo1, JewelPhoto1)
      : Promise.resolve();
    const uploadJewelPhoto2Promise = jewel_photo2
      ? uploadFile(jewel_photo2, JewelPhoto2)
      : Promise.resolve();
    const uploadJewelPhoto3Promise = jewel_photo3
      ? uploadFile(jewel_photo3, JewelPhoto3)
      : Promise.resolve();
    const uploadJewelPhoto4Promise = jewel_photo4
      ? uploadFile(jewel_photo4, JewelPhoto4)
      : Promise.resolve();
    const uploadJewelPhoto5Promise = jewel_photo5
      ? uploadFile(jewel_photo5, JewelPhoto5)
      : Promise.resolve();
    const uploadJewelPhoto6Promise = jewel_photo6
      ? uploadFile(jewel_photo6, JewelPhoto6)
      : Promise.resolve();
    const uploadJewelPhoto7Promise = jewel_photo7
      ? uploadFile(jewel_photo7, JewelPhoto7)
      : Promise.resolve();
    const uploadJewelPhoto8Promise = jewel_photo8
      ? uploadFile(jewel_photo8, JewelPhoto8)
      : Promise.resolve();
    const uploadJewelPhoto9Promise = jewel_photo9
      ? uploadFile(jewel_photo9, JewelPhoto9)
      : Promise.resolve();
    const uploadJewelPhoto10Promise = jewel_photo10
      ? uploadFile(jewel_photo10, JewelPhoto10)
      : Promise.resolve();

    // Wait for all file uploads to complete
    await Promise.all([
      uploadJewelPhotoPromise,
      uploadJewelPhoto1Promise,
      uploadJewelPhoto2Promise,
      uploadJewelPhoto3Promise,
      uploadJewelPhoto4Promise,
      uploadJewelPhoto5Promise,
      uploadJewelPhoto6Promise,
      uploadJewelPhoto7Promise,
      uploadJewelPhoto8Promise,
      uploadJewelPhoto9Promise,
      uploadJewelPhoto10Promise,
    ]);

    // Create a new JewelDetail object
    const newJewelDetail = new JewelDetail({
      loan_id,
      jewel_type,
      purity,
      count,
      gross_weight,
      stone,
      wastage,
      net_weight,
      jewel_photo: jewel_photo ? JewelPhoto : null,
      jewel_type1,
      purity1,
      count1,
      gross_weight1,
      stone1,
      wastage1,
      net_weight1,
      jewel_photo1: jewel_photo1 ? JewelPhoto1 : null,
      jewel_type2,
      purity2,
      count2,
      gross_weight2,
      stone2,
      wastage2,
      net_weight2,
      jewel_photo2: jewel_photo2 ? JewelPhoto2 : null,
      jewel_type3,
      purity3,
      count3,
      gross_weight3,
      stone3,
      wastage3,
      net_weight3,
      jewel_photo3: jewel_photo3 ? JewelPhoto3 : null,
      jewel_type4,
      purity4,
      count4,
      gross_weight4,
      stone4,
      wastage4,
      net_weight4,
      jewel_photo4: jewel_photo4 ? JewelPhoto4 : null,
      jewel_type5,
      purity5,
      count5,
      gross_weight5,
      stone5,
      wastage5,
      net_weight5,
      jewel_photo5: jewel_photo5 ? JewelPhoto5 : null,
      jewel_type6,
      purity6,
      count6,
      gross_weight6,
      stone6,
      wastage6,
      net_weight6,
      jewel_photo6: jewel_photo6 ? JewelPhoto6 : null,
      jewel_type7,
      purity7,
      count7,
      gross_weight7,
      stone7,
      wastage7,
      net_weight7,
      jewel_photo7: jewel_photo7 ? JewelPhoto7 : null,
      jewel_type8,
      purity8,
      count8,
      gross_weight8,
      stone8,
      wastage8,
      net_weight8,
      jewel_photo8: jewel_photo8 ? JewelPhoto8 : null,
      jewel_type9,
      purity9,
      count9,
      gross_weight9,
      stone9,
      wastage9,
      net_weight9,
      jewel_photo9: jewel_photo9 ? JewelPhoto9 : null,
      jewel_type10,
      purity10,
      count10,
      gross_weight10,
      stone10,
      wastage10,
      net_weight10,
      jewel_photo10: jewel_photo10 ? JewelPhoto10 : null,
    });

    // Save the jewel detail to the database
    JewelDetail.createJewelDetail(newJewelDetail, (err, jeweldetail) => {
      if (err) {
        console.error("Error creating jewel detail:", err);
        return res.status(500).json({ error: "Failed to create jewel detail" });
      }

      // Helper function to get pre-signed URL for file retrieval from AWS S3 bucket
      const getPresignedUrl = (fileName) => {
        const params = {
          Bucket: BUCKET,
          Key: fileName,
          Expires: 3600, // URL expiration time in seconds
        };
        return s3.getSignedUrl("getObject", params);
      };

      // Create the image URLs
      const jewelPhotoUrl = jewel_photo ? getPresignedUrl(JewelPhoto) : null;
      const jewelPhoto1Url = jewel_photo1 ? getPresignedUrl(JewelPhoto1) : null;
      const jewelPhoto2Url = jewel_photo2 ? getPresignedUrl(JewelPhoto2) : null;
      const jewelPhoto3Url = jewel_photo3 ? getPresignedUrl(JewelPhoto3) : null;
      const jewelPhoto4Url = jewel_photo4 ? getPresignedUrl(JewelPhoto4) : null;
      const jewelPhoto5Url = jewel_photo5 ? getPresignedUrl(JewelPhoto5) : null;
      const jewelPhoto6Url = jewel_photo6 ? getPresignedUrl(JewelPhoto6) : null;
      const jewelPhoto7Url = jewel_photo7 ? getPresignedUrl(JewelPhoto7) : null;
      const jewelPhoto8Url = jewel_photo8 ? getPresignedUrl(JewelPhoto8) : null;
      const jewelPhoto9Url = jewel_photo9 ? getPresignedUrl(JewelPhoto9) : null;
      const jewelPhoto10Url = jewel_photo10
        ? getPresignedUrl(JewelPhoto10)
        : null;

      // Add the image URLs to the response
      res.status(201).json({
        message: "Jewel detail created successfully",
        jewelDetail: {
          ...newJewelDetail,
          jewel_photo: jewelPhotoUrl,
          jewel_photo1: jewelPhoto1Url,
          jewel_photo2: jewelPhoto2Url,
          jewel_photo3: jewelPhoto3Url,
          jewel_photo4: jewelPhoto4Url,
          jewel_photo5: jewelPhoto5Url,
          jewel_photo6: jewelPhoto6Url,
          jewel_photo7: jewelPhoto7Url,
          jewel_photo8: jewelPhoto8Url,
          jewel_photo9: jewelPhoto9Url,
          jewel_photo10: jewelPhoto10Url,
        },
      });
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Failed to upload files" });
  } finally {
    // Remove temporary files
    const {
      jewel_photo,
      jewel_photo1,
      jewel_photo2,
      jewel_photo3,
      jewel_photo4,
      jewel_photo5,
      jewel_photo6,
      jewel_photo7,
      jewel_photo8,
      jewel_photo9,
      jewel_photo10,
    } = req.files;
    [
      jewel_photo,
      jewel_photo1,
      jewel_photo2,
      jewel_photo3,
      jewel_photo4,
      jewel_photo5,
      jewel_photo6,
      jewel_photo7,
      jewel_photo8,
      jewel_photo9,
      jewel_photo10,
    ].forEach((file) => {
      if (file && file.path) {
        fs.unlinkSync(file.path);
      }
    });
  }
};

exports.getJewelDetail = (req, res) => {
  const jeweldetail_id = req.params.id;

  JewelDetail.getJewelDetailById(jeweldetail_id, (err, jeweldetail) => {
    if (err) {
      console.error("Error retrieving jewel detail:", err);
      return res.status(500).json({ error: "Failed to retrieve jewel detail" });
    }

    if (!jeweldetail) {
      return res.status(404).json({ message: "Jewel detail not found" });
    }

    // Helper function to get pre-signed URL for file retrieval from AWS S3 bucket
    const getPresignedUrl = (fileName) => {
      const params = {
        Bucket: BUCKET,
        Key: fileName,
        Expires: 3600, // URL expiration time in seconds
      };
      return s3.getSignedUrl("getObject", params);
    };

    // Create the image URLs
    const jewelPhotoUrl = getPresignedUrl(jeweldetail.jewel_photo);
    const jewelPhoto1Url = getPresignedUrl(jeweldetail.jewel_photo1);
    const jewelPhoto2Url = getPresignedUrl(jeweldetail.jewel_photo2);
    const jewelPhoto3Url = getPresignedUrl(jeweldetail.jewel_photo3);
    const jewelPhoto4Url = getPresignedUrl(jeweldetail.jewel_photo4);
    const jewelPhoto5Url = getPresignedUrl(jeweldetail.jewel_photo5);
    const jewelPhoto6Url = getPresignedUrl(jeweldetail.jewel_photo6);
    const jewelPhoto7Url = getPresignedUrl(jeweldetail.jewel_photo7);
    const jewelPhoto8Url = getPresignedUrl(jeweldetail.jewel_photo8);
    const jewelPhoto9Url = getPresignedUrl(jeweldetail.jewel_photo9);
    const jewelPhoto10Url = getPresignedUrl(jeweldetail.jewel_photo10);

    // Add the image URLs to the response
    res.status(200).json({
      message: "Jewel detail retrieved successfully",
      jewelDetail: {
        ...jeweldetail,
        jewel_photo: jewelPhotoUrl,
        jewel_photo1: jewelPhoto1Url,
        jewel_photo2: jewelPhoto2Url,
        jewel_photo3: jewelPhoto3Url,
        jewel_photo4: jewelPhoto4Url,
        jewel_photo5: jewelPhoto5Url,
        jewel_photo6: jewelPhoto6Url,
        jewel_photo7: jewelPhoto7Url,
        jewel_photo8: jewelPhoto8Url,
        jewel_photo9: jewelPhoto9Url,
        jewel_photo10: jewelPhoto10Url,
      },
    });
  });
};

exports.getAllJewelDetail = (req, res) => {
  JewelDetail.getAllJewelDetail((err, jeweldetails) => {
    if (err) {
      console.error("Error retrieving jewel details:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve jewel details" });
    }

    const getPresignedUrl = (fileName) => {
      if (fileName) {
        const params = {
          Bucket: BUCKET,
          Key: fileName, // The 'Key' parameter is expected here
          Expires: 3600, // URL expiration time in seconds
        };
        return s3.getSignedUrl("getObject", params);
      } else {
        // Handle the case where fileName is null or empty
        return null; // You can choose to return a default URL or handle this case differently
      }
    };

    // Create the image URLs for all jewel details
    const jewelDetailsWithUrls = jeweldetails.map((jeweldetail) => ({
      ...jeweldetail,
      jewel_photo: getPresignedUrl(jeweldetail.jewel_photo),
      jewel_photo1: getPresignedUrl(jeweldetail.jewel_photo1),
      jewel_photo2: getPresignedUrl(jeweldetail.jewel_photo2),
      jewel_photo3: getPresignedUrl(jeweldetail.jewel_photo3),
      jewel_photo4: getPresignedUrl(jeweldetail.jewel_photo4),
      jewel_photo5: getPresignedUrl(jeweldetail.jewel_photo5),
      jewel_photo6: getPresignedUrl(jeweldetail.jewel_photo6),
      jewel_photo7: getPresignedUrl(jeweldetail.jewel_photo7),
      jewel_photo8: getPresignedUrl(jeweldetail.jewel_photo8),
      jewel_photo9: getPresignedUrl(jeweldetail.jewel_photo9),
      jewel_photo10: getPresignedUrl(jeweldetail.jewel_photo10),
    }));

    res.status(200).json({ jewelDetails: jewelDetailsWithUrls });
  });
};

exports.deleteJewelDetail = (req, res) => {
  const jewelDetailId = req.params.id;

  JewelDetail.deleteJewelDetailById(jewelDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found jewel detail with id ${jewelDetailId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete jewel detail with id ${jewelDetailId}`,
        });
      }
    } else res.send({ message: `Jewel detail was deleted successfully!` });
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