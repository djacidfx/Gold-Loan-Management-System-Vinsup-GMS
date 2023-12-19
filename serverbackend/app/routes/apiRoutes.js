const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../../middleware/authMiddleware");

const allDataController = require('../controllers/allDataControllers');
//****************************User Module***************************************
const userController = require("../controllers/userController");
const userlogController = require("../controllers/userlogController");

//**************************Customer Module*************************************
const customerController = require("../controllers/customerController");

//*************************Gold Rate Module*************************************
const goldrateController = require("../controllers/goldrateController");

//************************Loan Approval Module**********************************
const loanapprovaldetailsController = require("../controllers/loanapprovaldetailsController");
const jeweldetailsController = require("../controllers/jeweldetailController");
const totalloanvalueController = require("../controllers/totalloanvalueController");

// //***************************Repayment Module***********************************

//Partpayment
const partpaymentController = require("../controllers/partpaymentController");
const partpaymentinterestController=require("../controllers/partpaymentinterestController");
const partpaymentpaymentamountController=require("../controllers/partpaymentpaymentamountController");

//Settlement
const settlementController = require("../controllers/settlementController");
const settlementinterestController=require("../controllers/settlementinterestController");
const settlementloanamountController=require("../controllers/settlementloanamountController");
const settlementadditionalamountController=require("../controllers/settlementadditionalamountController");
const settlementadjustmentamountController=require("../controllers/settlementadjustmentamountController");

//****************************Account Module************************************
const capitaldebitController = require("../controllers/capitaldebitController");
const bankdebitController = require("../controllers/bankdebitController");
const capitalcreditController = require("../controllers/capitalcreditController");
const bankcreditController = require("../controllers/bankcreditController");
const jewelloancreditController = require("../controllers/jewelloancreditController");
const jewelloandebitController = require("../controllers/jewelloandebitController");
const cashscrollController = require("../controllers/cashscrollController");
const cashscrolldenominationController = require("../controllers/cashscrolldenominationController");
const cashonhandcreditController = require("../controllers/cashonhandcreditController");
const cashonhanddebitController = require("../controllers/cashonhanddebitController");
const balancesheetController = require("../controllers/balancesheetController");
const suspencedebitController = require("../controllers/suspencedebitController");
const suspencecreditController = require("../controllers/suspencecreditController");
const profitandlosscreditController = require("../controllers/profitandlosscreditController");
const profitandlossdebitController = require("../controllers/profitandlossdebitController");
const expencescreditController = require("../controllers/expencescreditController");
const expencesdebitController = require("../controllers/expencesdebitController");
const furniturecreditController =require("../controllers/furniturecreditController");
const furnituredebitController = require("../controllers/furnituredebitController");
const suspencecreditdbController = require("../controllers/suspencecreditdbController");
const suspencedebitdbController=require("../controllers/suspencedebitdbController");
const furniturecreditdbController = require("../controllers/FurniturecreditdbController");
const furnituredebitdbController = require("../controllers/furnituredebitdbController");

//******************************Transfer Scroll*********************************
const transfercapitalcreditController = require("../controllers/transfercapitalcreditController");
const transfercapitaldebitController = require("../controllers/transfercapitaldebitController");
const transferbankcreditController= require("../controllers/transferbankcreditController");
const transferbankdebitController = require("../controllers/transferbankdebitController");
const transferjewelloancreditController = require("../controllers/transferjewelloancreditController");
const transferjewelloandebitController =require("../controllers/transferjewelloandebitController")
const transferprofitandlosscreditController = require("../controllers/transferprofitandlosscreditController");
const transferprofitandlossdebitController = require("../controllers/transferprofitandlossdebitController");
const transfersuspencecreditController = require("../controllers/transfersuspencecreditController");
const transfersuspencedebitController = require("../controllers/transfersuspencedebitController");
const transferfurniturecreditController =require("../controllers/transferfurniturecreditController");
const transferfurnituredebitController = require("../controllers/transferfurnituredebitController");
const transferexpencescreditController = require("../controllers/transferexpencescreditController");
const transferexpencesdebitController = require("../controllers/transferexpencesdebitController");

//**********************************Daybook*************************************
const profitandlosscreditdbController = require("../controllers/profitandlosscreditdbController");
const profitandlossdebitdbController=require("../controllers/profitandlossdebitdbController");
const jewelloancreditdbController = require("../controllers/jewelloancreditdbController");
const jewelloandebitdbController = require("../controllers/jewelloandebitdbController");
const capitalcreditdbController = require("../controllers/capitalcreditdbController");
const capitaldebitdbController =require("../controllers/capitaldebitdbController");
const bankcreditdbController = require("../controllers/bankcreditdbController");
const bankdebitdbController = require("../controllers/bankdebitdbController");
const expencescreditdbController=require("../controllers/expencescreditdbController");
const expencesdebitdbController=require("../controllers/expencesdebitdbController");

//*********************************Master***************************************
const masterstateController = require("../controllers/masterstateController");
const mastercityController = require("../controllers/mastercityController");
const masterrelationtypeController=require("../controllers/masterrelationtypeController");
const masterjeweltypeController=require("../controllers/masterjeweltypeController");
const masterpurityController=require("../controllers/masterpurityController");
const masterloanschemeController=require("../controllers/masterloanschemeController");

//*****************************Payroll Module***********************************
const attendancedetailsController = require("../controllers/attendancedetailController");
const salarydetailsController = require("../controllers/salarydetailsController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Check file type if needed
  // For example, only allow images

  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Invalid file type. Only image files are allowed."));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Customer Routes
router.post(
  "/customer",
  upload.fields([
    { name: "customer_image", maxCount: 1 },
    { name: "document_copy1", maxCount: 1 },
    { name: "document_copy2", maxCount: 1 },
  ]),
  customerController.addCustomer
);

router.put("/customers/:id", customerController.updateCustomer);
router.get("/customer/:id", customerController.getCustomer);
router.get("/customers", customerController.getAllCustomers);
router.delete("/customers/:id", customerController.deleteCustomer);

//allData
router.get('/allData', allDataController.getAllData);
// Loan Approval Route
router.post("/loanapproval", loanapprovaldetailsController.loanapprovaldetails);
router.get("/loanapprovals",loanapprovaldetailsController.getAllLoanApprovalDetails);
router.put(
  "/loanapprovaldetails/:loan_id",
  loanapprovaldetailsController.updateLoanApprovalDetails
);
router.delete("/loanapprovaldetails/:id",loanapprovaldetailsController.deleteLoanApprovalDetails);

// Jewel Details Routes

router.post(
  "/jeweldetail",
  upload.fields([
    { name: "jewel_photo", maxCount: 1 },
    { name: "jewel_photo1", maxCount: 1 },
    { name: "jewel_photo2", maxCount: 1 },
    { name: "jewel_photo3", maxCount: 1 },
    { name: "jewel_photo4", maxCount: 1 },
    { name: "jewel_photo5", maxCount: 1 },
    { name: "jewel_photo6", maxCount: 1 },
    { name: "jewel_photo7", maxCount: 1 },
    { name: "jewel_photo8", maxCount: 1 },
    { name: "jewel_photo9", maxCount: 1 },
    { name: "jewel_photo10", maxCount: 1 },
  ]),
  jeweldetailsController.addJewelDetail
);
router.get("/jeweldetails", jeweldetailsController.getAllJewelDetail);

// Total Loan Value Routes
router.post("/totalloanvalue", totalloanvalueController.totalloanvalue);
router.get("/totalloanvalues", totalloanvalueController.getAllTotalLoanValue);
router.put("/totalloanvaludetails/:loan_id", totalloanvalueController.updateTotalLoanValueById);

//**********************************Repayment Module****************************

//Partpayment Routes
router.post("/partpayment", partpaymentController.partpayment);
router.get("/partpayments", partpaymentController.getAllPartpayment);
// Define the PUT route with a dynamic date1 parameter
router.put("/partpayments/:id", partpaymentController.updatePartpayment);


//Partpayment Interest Routes
router.post("/partpaymentinterest",partpaymentinterestController.partpaymentinterest);
router.get("/partpaymentinterests",partpaymentinterestController.getAllPartpaymentInterest);

//Partpayment Payment Amount Routes
router.post("/partpaymentpaymentamount",partpaymentpaymentamountController.partpaymentpaymentamount);
router.get("/partpaymentpaymentamounts",partpaymentpaymentamountController.getAllPartpaymentPaymentamount);

//Settlement Routes
router.post("/settlement", settlementController.settlement);
router.get("/settlements", settlementController.getAllSettlement);

//Settlement Interest Routes
router.post("/settlementinterest",settlementinterestController.settlementinterest);
router.get("/settlementinterests",settlementinterestController.getAllSettlementInterest);

//Settlement Loan amount Routes
router.post("/settlementloanamount",settlementloanamountController.settlementloanamount);
router.get("/settlementloanamounts",settlementloanamountController.getAllSettlementLoanamount);

//Settlement Additional Amount Routes
router.post("/settlementadditionalamount",settlementadditionalamountController.settlementadditionalamount);
router.get("/settlementadditionalamounts",settlementadditionalamountController.getAllSettlementAdditionalAmount);

//Settlement Adjustment Amount Routes
router.post("/settlementadjustmentamount",settlementadjustmentamountController.settlementadjustmentamount);
router.get("/settlementadjustmentamounts",settlementadjustmentamountController.getAllSettlementAdjustmentAmount);

// Gold Rate Routes
router.post("/goldrate", goldrateController.goldrateupdate);
router.get("/goldrates", goldrateController.getAllGoldRate);

// Attendance Details Routes
router.post("/attendancedetail", attendancedetailsController.attendancedetails);
router.get(
  "/attendancedetails",
  attendancedetailsController.getAllAttendanceDetails
);

//salary deails Routes
router.post("/salarydetail", salarydetailsController.salarydetails);
router.get("/salarydetails", salarydetailsController.getAllSalaryDetails);

//****************************Master Routes Start*******************************

//*****************************City Routes**************************************
router.post("/city", mastercityController.mastercity);
router.get("/cities", mastercityController.getAllMasterCity);

//*****************************State Route**************************************
router.post("/state", masterstateController.masterstate);
router.get("/states", masterstateController.getAllMasterState);

//***************************Relation Type**************************************
router.post("/relationtype",masterrelationtypeController.masterrelationship);
router.get("/relationtypes",masterrelationtypeController.getAllMasterRelationship);

//***************************Jewel Type*****************************************
router.post("/jeweltype",masterjeweltypeController.masterjeweltype);
router.get("/jeweltypes",masterjeweltypeController.getAllMasterJewelType);

//***************************Purity*********************************************
router.post("/purity",masterpurityController.masterpurity);
router.get("/purities",masterpurityController.getAllMasterPurity);

//**************************Jewel Loan Schema***********************************
router.post("/loanscheme",masterloanschemeController.masterloanscheme);
router.get("/loanschemes",masterloanschemeController.getAllMasterLoanScheme);

//***************************Master Routes end**********************************

//****************************Account Module************************************

//****************************Balance Sheet*************************************
router.post("/balancesheet",balancesheetController.balancesheet);
router.get("/balancesheets",balancesheetController.getAllBalanceSheet);
router.put("/balancesheets/date",balancesheetController.updateBalanceSheetByDate);
router.get("/balancesheets/date", balancesheetController.getBalanceSheetsByDate); // New route to get balance sheets by date


//****************************Cash Scroll Start*********************************

//Cash Scroll Routes
router.post("/cashscroll", cashscrollController.createCashScroll);
router.get("/cashscrolls", cashscrollController.getAllCashScrolls);

//Cash Scroll Denomination
router.post("/cashscrolldenomination",cashscrolldenominationController.createCashScrolldenomination);
router.get("/cashscrolldenominations",cashscrolldenominationController.getAllCashScrollDenomination);

// Update a Cash Scroll's closing amount
router.put("/:date", cashscrollController.updateCashScrollClosingAmount);


//**********************************Daybook*************************************

//Profit and Loss Credit route
router.post("/profitandlosscreditdb",profitandlosscreditdbController.profitandlosscreditdb);
router.get("/profitandlosscreditdbs",profitandlosscreditdbController.getAllProfitAndLossCreditdb);
router.put("/profitandlosscreditdbs/:id",profitandlosscreditdbController.updateProfitAndLossCreditdb);

//Profit and loss Debit route
router.post("/profitandlossdebitdb",profitandlossdebitdbController.profitandlossdebitdb);
router.get("/profitandlossdebitdbs",profitandlossdebitdbController.getAllProfitAndLossDebitdb);
router.put("/profitandlossdebitdbs/:id",profitandlossdebitdbController.updateProfitAndLossDebitdb);

//Jewel Loan Credit Route
router.post("/jewelloancreditdb",jewelloancreditdbController.jewelloancreditdb);
router.get("/jewelloancreditdbs",jewelloancreditdbController.getAllJewelLoanCreditdb);
router.put("/jewelloancreditdbs/:id",jewelloancreditdbController.updateJewelLoanCreditdb);

//Jewel Loan Debit Route
router.post("/jewelloandebitdb",jewelloandebitdbController.jewelloandebitdb);
router.get("/jewelloandebitdbs",jewelloandebitdbController.getAllJewelLoanDebitdb);
router.put("/jewelloandebitdbs/:id",jewelloandebitdbController.updateJewelLoanDebitdb);

//Capital Credit Route
router.post("/capitalcreditdb",capitalcreditdbController.capitalcreditdb);
router.get("/capitalcreditdbs",capitalcreditdbController.getAllCapitalCreditdb);
router.put("/capitalcreditdbs/:id",capitalcreditdbController.updateCapitalCreditdb);

//Capital Debit Route
router.post("/capitaldebitdb",capitaldebitdbController.capitaldebitdb);
router.get("/capitaldebitdbs",capitaldebitdbController.getAllCapitalDebitdb);
router.put("/capitaldebitdbs/:id",capitaldebitdbController.updateCapitalDebitdb);

//Bank Credit Route
router.post("/bankcreditdb",bankcreditdbController.bankcreditdb);
router.get("/bankcreditdbs",bankcreditdbController.getAllBankCreditdb);
router.put("/bankcreditdbs/:id",bankcreditdbController.updateBankCreditdb);

//Bank Debit Route
router.post("/bankdebitdb",bankdebitdbController.bankdebitdb);
router.get("/bankdebitdbs",bankdebitdbController.getAllBankDebitdb);
router.put("/bankdebitdbs/:id",bankdebitdbController.updateBankDebitdb);

//Suspence Credit Route
router.post("/suspencecreditdb",suspencecreditdbController.suspencecreditdb);
router.get("/suspencecreditsdbs",suspencecreditdbController.getAllSuspenceCreditdb);
router.put("/suspencecreditdbs/:id",suspencecreditdbController.updateSuspenceCreditdb);

//Expence Credit Route
router.post("/expencescreditdb",expencescreditdbController.expencescreditdb);
router.get("/expencescreditdbs",expencescreditdbController.getAllExpencesCreditdb);
router.put("/expencescreditdbs/:id",expencescreditdbController.updateExpencesCreditdb);

//Expence Debit Route
router.post("/expencesdebitdb",expencesdebitdbController.expencesdebitdb);
router.get("/expencesdebitdbs",expencesdebitdbController.getAllExpencesDebitdb);
router.put("/expencesdebitdbs/:id",expencesdebitdbController.updateExpencesDebitdb);

//Suspence Debit Route
router.post("/suspencedebitdb",suspencedebitdbController.suspencedebitdb);
router.get("/suspencedebitdbs",suspencedebitdbController.getAllSuspenceDebitdb);
router.put("/suspencedebitdbs/:id",suspencedebitdbController.updateSuspenceDebitdb);

//Furniture Credit Route
router.post("/furniturecreditdb",furniturecreditdbController.furniturecreditdb);
router.get("/furniturecreditdbs",furniturecreditdbController.getAllFurnitureCreditdb);
router.put("/furniturecreditdbs/:id",furniturecreditdbController.updateFurnitureCreditdb);

//Furniture Debit Route
router.post("/furnituredebitdb",furnituredebitdbController.furnituredebitdb);
router.get("/furnituredebitdbs",furnituredebitdbController.getAllFurnitureDebitdb);
router.put("/furnituredebitdbs/:id",furnituredebitdbController.updateFurnitureDebitdb);

//********************************Transfer Scroll*******************************

//Transfer capital credit
router.post("/transfercapitalcredit",transfercapitalcreditController.transfercapitalcredit);
router.get("/transfercapitalcredits",transfercapitalcreditController.getAllTransferCapitalCredit);

//Transfer Capital Debit
router.post("/transfercapitaldebit",transfercapitaldebitController.transfercapitaldebit);
router.get("/transfercapitaldebits",transfercapitaldebitController.getAllTransferCapitalDebit);

//Transfer Bank Credit
router.post("/transferbankcredit",transferbankcreditController.transferbankcredit);
router.get("/transferbankcredits",transferbankcreditController.getAllTransferBankCredit);

//Transfer Bank Debit
router.post("/transferbankdebit",transferbankdebitController.transferbankdebit);
router.get("/transferbankdebits",transferbankdebitController.getAllTransferBankDebit);

//Transfer Jewel Loan Credit
router.post("/transferjewelloancredit",transferjewelloancreditController.transferjewelloancredit);
router.get("/transferjewelloancredits",transferjewelloancreditController.getAllTransferJewelloanCredit);

//Transfer Jewel Loan Debit
router.post("/transferjewelloandebit",transferjewelloandebitController.transferjewelloandebit);
router.get("/transferjewelloandebits",transferjewelloandebitController.getAllTransferJewelloanDebit);

//Transfer Profit and loss Credit
router.post("/transferprofitandlosscredit",transferprofitandlosscreditController.transferprofitandlosscredit);
router.get("/transferprofitandlosscredits",transferprofitandlosscreditController.getAllTransferProfitandlossCredit);

//Transfer Profit and loss Debit
router.post("/transferprofitandlossdebit",transferprofitandlossdebitController.transferprofitandlossdebit);
router.get("/transferprofitandlossdebits",transferprofitandlossdebitController.getAllTransferProfitandlossDebit);

//Transfer Suspence Credit Route
router.post("/transfersuspencecredit",transfersuspencecreditController.transfersuspencecredit);
router.get("/transfersuspencecredits",transfersuspencecreditController.getAllTransferSuspenceCredit);

//Transfer Suspence Debit Route
router.post("/transfersuspencedebit",transfersuspencedebitController.transfersuspencedebit);
router.get("/transfersuspencedebits",transfersuspencedebitController.getAllTransferSuspenceDebit);

//Transfer Furniture Credit Route
router.post("/transferfurniturecredit",transferfurniturecreditController.transferfurniturecredit);
router.get("/transferfurniturecredits",transferfurniturecreditController.getAllTransferFurnitureCredit);

//Transfer Furniture Debit Route
router.post("/transferfurnituredebit",transferfurnituredebitController.transferfurnituredebit);
router.get("/transferfurnituredebits",transferfurnituredebitController.getAllTransferFurnitureDebit);

//Transfer Expences Credit Route
router.post("/transferexpencescredit",transferexpencescreditController.transferexpencescredit);
router.get("/transferexpencescredits",transferexpencescreditController.getAllTransferExpencesCredit);

//Transfer Expences Debit Route
router.post("/transferexpencesdebit",transferexpencesdebitController.transferexpencesdebit);
router.get("/transferexpencesdebits",transferexpencesdebitController.getAllTransferExpencesDebit);


//****************************General ledger************************************

//****************************Debit Part Start**********************************

//Capital debit transfer scroll Route
router.post("/capitaldebit", capitaldebitController.capitaldepit);
router.get("/capitaldebits", capitaldebitController.getAllCapitalDepit);

//Bank Debit Transfer Scroll Route
router.post("/bankdebit", bankdebitController.bankdebit);
router.get("/bankdebits", bankdebitController.getAllBankDebit);

//Jewel loan debit Transfer scroll Route
router.post("/jewelloandebit", jewelloandebitController.jewelloandebit);
router.get("/jewelloandebits", jewelloandebitController.getAllJewelLoanDebit);

//Cash on Hand debit Transfer Scroll Route
router.post("/cashonhanddebit",cashonhanddebitController.cashonhandcredit);
router.get("/cashonhanddebits",cashonhanddebitController.getAllCashOnHandDebit);

//Suspence Debit Route
router.post("/suspencedebit",suspencedebitController.suspencedebit);
router.get("/suspencedebits",suspencedebitController.getAllSuspenceDepit);

//Profit And loss Debit Routes
router.post("/profiflossdebit",profitandlossdebitController.profitandlossdebit);
router.get("/profiflossdebits",profitandlossdebitController.getAllProfitAndLossDebit);

//Expences Debit Routes
router.post("/expencesdebit",expencesdebitController.expencesdebit);
router.get("/expencesdebits",expencesdebitController.getAllExpencesDebit);

//Furniture Debit Routes
router.post("/furnituredebit",furnituredebitController.furnituredebit);
router.get("/furnituredebits",furnituredebitController.getAllFurnitureDebit);


//*****************************Debit part end***********************************

//*****************************credit part start********************************

//Capital credit transfer scroll Route
router.post("/capitalcredit", capitalcreditController.capitalcredit);
router.get("/capitalcredits", capitalcreditController.getAllCapitalCredit);

//Bank Credit transfer scroll Route
router.post("/bankcredit", bankcreditController.bankcredit);
router.get("/bankcredits", bankcreditController.getAllBankCredit);

//Jewel loan credit transfer scroll Route
router.post("/jewelloancredit", jewelloancreditController.jewelloancredit);
router.get("/jewelloancredits",jewelloancreditController.getAllJewelLoanCredit);

//Cash On Hand credit Transfer scroll route
router.post("/cashonhancredit", cashonhandcreditController.cashonhandcredit);
router.get("/cashonhandcredits",cashonhandcreditController.getAllCashOnHandCredit);

//Suspence Credit Route
router.post("/suspencecredit",suspencecreditController.suspencecredit);
router.get("/suspencecredits",suspencecreditController.getAllSuspenceCredit);

//Profit and loss  Credit Routes
router.post("/profiflosscredit",profitandlosscreditController.profitandlosscredit);
router.get("/profitlosscredits",profitandlosscreditController.getAllProfitAndLossCredit);

//Expences Credit Routes
router.post("/expencescredit",expencescreditController.expencescredit);
router.get("/expencescredits",expencescreditController.getAllExpencesCredit);

//Furniture credit Routes
router.post("/furniturecredit",furniturecreditController.furniturecredit);
router.get("/furniturecredits",furniturecreditController.getAllFurnitureCredit);

//******************************capital part end********************************

//******************************Account Module end******************************

// User Routes
router.post("/signup", userController.signup);

router.get("/users", verifyToken, (req, res) => {
  // This is a sample protected route, accessible only with a valid token
  res.json({ message: "Protected route", userId: req.userId });
});

//Userlog Route
router.post("/userlog",userlogController.userlog);
router.get("/userlogs",userlogController.getAllUserLog);
router.put("/userlogs/:id",userlogController.updateUserLog);

module.exports = router;