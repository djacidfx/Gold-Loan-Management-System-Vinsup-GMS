const connection = require("../../db");

const JewelDetail = function (jeweldetail) {
  this.loan_id = jeweldetail.loan_id; // Add this line
  this.jewel_type = jeweldetail.jewel_type;
  this.purity = jeweldetail.purity;
  this.count = jeweldetail.count;
  this.gross_weight = jeweldetail.gross_weight;
  this.stone = jeweldetail.stone;
  this.wastage = jeweldetail.wastage;
  this.net_weight = jeweldetail.net_weight;
  this.jewel_photo = jeweldetail.jewel_photo;
  this.jewel_type1 = jeweldetail.jewel_type1;
  this.purity1 = jeweldetail.purity1;
  this.count1 = jeweldetail.count1;
  this.gross_weight1 = jeweldetail.gross_weight1;
  this.stone1 = jeweldetail.stone1;
  this.wastage1 = jeweldetail.wastage1;
  this.net_weight1 = jeweldetail.net_weight1;
  this.jewel_photo1 = jeweldetail.jewel_photo1;
  this.jewel_type2 = jeweldetail.jewel_type2;
  this.purity2 = jeweldetail.purity2;
  this.count2 = jeweldetail.count2;
  this.gross_weight2 = jeweldetail.gross_weight2;
  this.stone2 = jeweldetail.stone2;
  this.wastage2 = jeweldetail.wastage2;
  this.net_weight2 = jeweldetail.net_weight2;
  this.jewel_photo2 = jeweldetail.jewel_photo2;
  this.jewel_type3 = jeweldetail.jewel_type3;
  this.purity3 = jeweldetail.purity3;
  this.count3 = jeweldetail.count3;
  this.gross_weight3 = jeweldetail.gross_weight3;
  this.stone3 = jeweldetail.stone3;
  this.wastage3 = jeweldetail.wastage3;
  this.net_weight3 = jeweldetail.net_weight3;
  this.jewel_photo3 = jeweldetail.jewel_photo3;
  this.jewel_type4 = jeweldetail.jewel_type4;
  this.purity4 = jeweldetail.purity4;
  this.count4 = jeweldetail.count4;
  this.gross_weight4 = jeweldetail.gross_weight4;
  this.stone4 = jeweldetail.stone4;
  this.wastage4 = jeweldetail.wastage4;
  this.net_weight4 = jeweldetail.net_weight4;
  this.jewel_photo4 = jeweldetail.jewel_photo4;
  this.jewel_type5 = jeweldetail.jewel_type5;
  this.purity5 = jeweldetail.purity5;
  this.count5 = jeweldetail.count5;
  this.gross_weight5 = jeweldetail.gross_weight5;
  this.stone5 = jeweldetail.stone5;
  this.wastage5 = jeweldetail.wastage5;
  this.net_weight5 = jeweldetail.net_weight5;
  this.jewel_photo5 = jeweldetail.jewel_photo5;
  this.jewel_type6 = jeweldetail.jewel_type6;
  this.purity6 = jeweldetail.purity6;
  this.count6 = jeweldetail.count6;
  this.gross_weight6 = jeweldetail.gross_weight6;
  this.stone6 = jeweldetail.stone6;
  this.wastage6 = jeweldetail.wastage6;
  this.net_weight6 = jeweldetail.net_weight6;
  this.jewel_photo6 = jeweldetail.jewel_photo6;
  this.jewel_type7 = jeweldetail.jewel_type7;
  this.purity7 = jeweldetail.purity7;
  this.count7 = jeweldetail.count7;
  this.gross_weight7 = jeweldetail.gross_weight7;
  this.stone7 = jeweldetail.stone7;
  this.wastage7 = jeweldetail.wastage7;
  this.net_weight7 = jeweldetail.net_weight7;
  this.jewel_photo7 = jeweldetail.jewel_photo7;
  this.jewel_type8 = jeweldetail.jewel_type8;
  this.purity8 = jeweldetail.purity8;
  this.count8 = jeweldetail.count8;
  this.gross_weight8 = jeweldetail.gross_weight8;
  this.stone8 = jeweldetail.stone8;
  this.wastage8 = jeweldetail.wastage8;
  this.net_weight8 = jeweldetail.net_weight8;
  this.jewel_photo8 = jeweldetail.jewel_photo8;
  this.jewel_type9 = jeweldetail.jewel_type9;
  this.purity9 = jeweldetail.purity9;
  this.count9 = jeweldetail.count9;
  this.gross_weight9 = jeweldetail.gross_weight9;
  this.stone9 = jeweldetail.stone9;
  this.wastage9 = jeweldetail.wastage9;
  this.net_weight9 = jeweldetail.net_weight9;
  this.jewel_photo9 = jeweldetail.jewel_photo9;
  this.jewel_type10 = jeweldetail.jewel_type10;
  this.purity10 = jeweldetail.purity10;
  this.count10 = jeweldetail.count10;
  this.gross_weight10 = jeweldetail.gross_weight10;
  this.stone10 = jeweldetail.stone10;
  this.wastage10 = jeweldetail.wastage10;
  this.net_weight10 = jeweldetail.net_weight10;
  this.jewel_photo10 = jeweldetail.jewel_photo10;
};
JewelDetail.createJewelDetail = function (newJewelDetail, result) {
  Object.keys(newJewelDetail).forEach((key) => {
    if (newJewelDetail[key] === "") {
      newJewelDetail[key] = null;
    }
  });
  connection.query(
    "INSERT INTO jeweldetail SET ?",
    newJewelDetail,
    (error, res) => {
      if (error) {
        console.log("Error in creating JewelDetail: ", error);
        result(error, null);
      } else {
        console.log("JewelDetail created successfully");
        result(null, res.insertId);
      }
    }
  );
};

JewelDetail.getJewelDetailById = function (jeweldetail_id, result) {
  connection.query(
    "SELECT * FROM jeweldetail WHERE jeweldetail_id = ?",
    [jeweldetail_id],
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving jewel detail: ", error);
        result(error, null);
      } else {
        if (rows.length === 0) {
          console.log("JewelDetail not found");
          result(null, null);
        } else {
          console.log("JewelDetail retrieved successfully");
          result(null, rows[0]);
        }
      }
    }
  );
};

JewelDetail.getAllJewelDetail = function (callback) {
  connection.query("SELECT * FROM jeweldetail", (error, rows) => {
    if (error) {
      console.log("Error in retrieving jewel details: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

JewelDetail.deleteJewelDetailById = function (jeweldetail_id, result) {
  connection.query(
    "DELETE FROM jeweldetail WHERE jeweldetail_id = ?",
    [jeweldetail_id],
    (error, res) => {
      if (error) {
        console.log("Error in deleting jewel detail: ", error);
        result(error, null);
      } else {
        console.log("JewelDetail deleted successfully");
        result(null, res);
      }
    }
  );
};

JewelDetail.updateJewelDetailById = function (
  jeweldetail_id,
  updatedJewelDetail,
  result
) {
  Object.keys(updatedJewelDetail).forEach((key) => {
    if (updatedJewelDetail[key] === "") {
      updatedJewelDetail[key] = "none";
    }
  });

  connection.query(
    "UPDATE jeweldetail SET ? WHERE jeweldetail_id = ?",
    [updatedJewelDetail, jeweldetail_id],
    (error, res) => {
      if (error) {
        console.log("Error in updating JewelDetail: ", error);
        result(error, null);
      } else {
        console.log("JewelDetail updated successfully");
        result(null, res);
      }
    }
  );
};

module.exports = JewelDetail;
