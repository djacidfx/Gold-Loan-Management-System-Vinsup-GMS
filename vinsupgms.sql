-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 17, 2023 at 05:40 PM
-- Server version: 8.0.26
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vinsupgms`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendancedetails`
--

CREATE TABLE `attendancedetails` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `check_in` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `check_out` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `balancesheet`
--

CREATE TABLE `balancesheet` (
  `balancesheet_id` int NOT NULL,
  `date` date NOT NULL,
  `capital_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cash_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitloss_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewel_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_balance` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bankcredit`
--

CREATE TABLE `bankcredit` (
  `bankaccount_credit_receipt_no` int NOT NULL,
  `bankaccount_credit_amount` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bankaccount_credit_remark` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bankaccount_credit_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bankcreditdb`
--

CREATE TABLE `bankcreditdb` (
  `bankcreditdb_id` int NOT NULL,
  `bank_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_credit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bankdebit`
--

CREATE TABLE `bankdebit` (
  `bankaccount_debit_receipt_no` int NOT NULL,
  `bankaccount_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bankaccount_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bankaccount_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bankdebitdb`
--

CREATE TABLE `bankdebitdb` (
  `bankdebitdb_id` int NOT NULL,
  `bank_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bank_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capitalcredit`
--

CREATE TABLE `capitalcredit` (
  `capital_credit_receipt_no` int NOT NULL,
  `capital_credit_amount` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_credit_remark` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_credit_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capitalcreditdb`
--

CREATE TABLE `capitalcreditdb` (
  `capitalcreditdb_id` int NOT NULL,
  `capital_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_credit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capitaldebit`
--

CREATE TABLE `capitaldebit` (
  `capital_debit_receipt_no` int NOT NULL,
  `capital_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_debit_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `capitaldebitdb`
--

CREATE TABLE `capitaldebitdb` (
  `capitaldebitdb_id` int NOT NULL,
  `capital_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capital_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashonhandcredit`
--

CREATE TABLE `cashonhandcredit` (
  `cash_on_hand_credit_id` int NOT NULL,
  `cashonhand_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cashonhand_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cashonhand_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashonhanddebit`
--

CREATE TABLE `cashonhanddebit` (
  `cash_on_hand_debit_id` int NOT NULL,
  `cashonhand_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cashonhand_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cashonhand_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashscroll`
--

CREATE TABLE `cashscroll` (
  `cashscroll_id` int NOT NULL,
  `opening_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `closing_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashscrolldenomination`
--

CREATE TABLE `cashscrolldenomination` (
  `CashScrolldenomination_id` int NOT NULL,
  `csc_count500` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count200` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count100` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count50` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count20` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count10` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count5` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `csc_count1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int NOT NULL,
  `customer_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phonenumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phonenumber_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mobile_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address_line_one` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address_line_two` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `registration_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `care_of_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `care_of_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nominee_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'none',
  `nominee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'none',
  `document1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_type1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_copy1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expire_date1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_number1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_type2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_copy2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expire_date2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_number2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `verified_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerlogin`
--

CREATE TABLE `customerlogin` (
  `customerlogin_id` int NOT NULL,
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `confirm_password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employeeregistration`
--

CREATE TABLE `employeeregistration` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mobile_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address_line` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pincode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_document_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_document_copy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_expire_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_document_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_joining` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `branch` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `institute_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `year_of_passing` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `degree` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_attached_document` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expencescredit`
--

CREATE TABLE `expencescredit` (
  `expences_credit_receipt_id` int NOT NULL,
  `expences_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_particulars` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expencescreditdb`
--

CREATE TABLE `expencescreditdb` (
  `expencescreditdb_id` int NOT NULL,
  `expences_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_particular` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_particular1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expencesdebit`
--

CREATE TABLE `expencesdebit` (
  `expences_debit_receipt_id` int NOT NULL,
  `expences_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_particulars` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expencesdebitdb`
--

CREATE TABLE `expencesdebitdb` (
  `expencesdebitdb_id` int NOT NULL,
  `expences_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_particular` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expences_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `furniturecredit`
--

CREATE TABLE `furniturecredit` (
  `furniture_credit_receipt_no` int NOT NULL,
  `furniture_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `furniturecreditdb`
--

CREATE TABLE `furniturecreditdb` (
  `furniturecreditdb_id` int NOT NULL,
  `furniture_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_credit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `furnituredebit`
--

CREATE TABLE `furnituredebit` (
  `furniture_debit_receipt_no` int NOT NULL,
  `furniture_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `furnituredebitdb`
--

CREATE TABLE `furnituredebitdb` (
  `furnituredebitdb_id` int NOT NULL,
  `furniture_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `furniture_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goldrate`
--

CREATE TABLE `goldrate` (
  `goldrate_id` int NOT NULL,
  `date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `timing` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `carat_22` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `carat_24` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interest_table`
--

CREATE TABLE `interest_table` (
  `interest_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date` date DEFAULT NULL,
  `interest_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jeweldetail`
--

CREATE TABLE `jeweldetail` (
  `jewel_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `jewel_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity` decimal(10,2) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `gross_weight` decimal(10,2) DEFAULT NULL,
  `stone` decimal(10,2) DEFAULT NULL,
  `wastage` decimal(10,2) DEFAULT NULL,
  `net_weight` decimal(10,2) DEFAULT NULL,
  `jewel_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity1` decimal(10,2) DEFAULT NULL,
  `count1` int DEFAULT NULL,
  `gross_weight1` decimal(10,2) DEFAULT NULL,
  `stone1` decimal(10,2) DEFAULT NULL,
  `wastage1` decimal(10,2) DEFAULT NULL,
  `net_weight1` decimal(10,2) DEFAULT NULL,
  `jewel_photo1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity2` decimal(10,2) DEFAULT NULL,
  `count2` int DEFAULT NULL,
  `gross_weight2` decimal(10,2) DEFAULT NULL,
  `stone2` decimal(10,2) DEFAULT NULL,
  `wastage2` decimal(10,2) DEFAULT NULL,
  `net_weight2` decimal(10,2) DEFAULT NULL,
  `jewel_photo2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity3` decimal(10,2) DEFAULT NULL,
  `count3` int DEFAULT NULL,
  `gross_weight3` decimal(10,2) DEFAULT NULL,
  `stone3` decimal(10,2) DEFAULT NULL,
  `wastage3` decimal(10,2) DEFAULT NULL,
  `net_weight3` decimal(10,2) DEFAULT NULL,
  `jewel_photo3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity4` decimal(10,2) DEFAULT NULL,
  `count4` int DEFAULT NULL,
  `gross_weight4` decimal(10,2) DEFAULT NULL,
  `stone4` decimal(10,2) DEFAULT NULL,
  `wastage4` decimal(10,2) DEFAULT NULL,
  `net_weight4` decimal(10,2) DEFAULT NULL,
  `jewel_photo4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity5` decimal(10,2) DEFAULT NULL,
  `count5` int DEFAULT NULL,
  `gross_weight5` decimal(10,2) DEFAULT NULL,
  `stone5` decimal(10,2) DEFAULT NULL,
  `wastage5` decimal(10,2) DEFAULT NULL,
  `net_weight5` decimal(10,2) DEFAULT NULL,
  `jewel_photo5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type6` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity6` decimal(10,2) DEFAULT NULL,
  `count6` int DEFAULT NULL,
  `gross_weight6` decimal(10,2) DEFAULT NULL,
  `stone6` decimal(10,2) DEFAULT NULL,
  `wastage6` decimal(10,2) DEFAULT NULL,
  `net_weight6` decimal(10,2) DEFAULT NULL,
  `jewel_photo6` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type7` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity7` decimal(10,2) DEFAULT NULL,
  `count7` int DEFAULT NULL,
  `gross_weight7` decimal(10,2) DEFAULT NULL,
  `stone7` decimal(10,2) DEFAULT NULL,
  `wastage7` decimal(10,2) DEFAULT NULL,
  `net_weight7` decimal(10,2) DEFAULT NULL,
  `jewel_photo7` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type8` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity8` decimal(10,2) DEFAULT NULL,
  `count8` int DEFAULT NULL,
  `gross_weight8` decimal(10,2) DEFAULT NULL,
  `stone8` decimal(10,2) DEFAULT NULL,
  `wastage8` decimal(10,2) DEFAULT NULL,
  `net_weight8` decimal(10,2) DEFAULT NULL,
  `jewel_photo8` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type9` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity9` decimal(10,2) DEFAULT NULL,
  `count9` int DEFAULT NULL,
  `gross_weight9` decimal(10,2) DEFAULT NULL,
  `stone9` decimal(10,2) DEFAULT NULL,
  `wastage9` decimal(10,2) DEFAULT NULL,
  `net_weight9` decimal(10,2) DEFAULT NULL,
  `jewel_photo9` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jewel_type10` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purity10` decimal(10,2) DEFAULT NULL,
  `count10` int DEFAULT NULL,
  `gross_weight10` decimal(10,2) DEFAULT NULL,
  `stone10` decimal(10,2) DEFAULT NULL,
  `wastage10` decimal(10,2) DEFAULT NULL,
  `net_weight10` decimal(10,2) DEFAULT NULL,
  `jewel_photo10` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelloancredit`
--

CREATE TABLE `jewelloancredit` (
  `jewelloan_credit_receipt_no` int NOT NULL,
  `jewelloan_credit_amount` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloan_credit_remark` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloan_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelloancreditdb`
--

CREATE TABLE `jewelloancreditdb` (
  `jewelloancreditdb_id` int NOT NULL,
  `jewelloandb_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_credit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelloandebit`
--

CREATE TABLE `jewelloandebit` (
  `jewelloan_debit_receipt_no` int NOT NULL,
  `jewelloan_debit_amount` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloan_debit_remark` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloan_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelloandebitdb`
--

CREATE TABLE `jewelloandebitdb` (
  `jewelloandebitdb_id` int NOT NULL,
  `jewelloandb_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jewelloandb_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loanapprovaldetails`
--

CREATE TABLE `loanapprovaldetails` (
  `loan_id` int NOT NULL,
  `customer_id` int DEFAULT NULL,
  `scheme` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `today_gold_rate` decimal(10,2) DEFAULT NULL,
  `loan_amount` decimal(10,2) DEFAULT NULL,
  `adjustment_charges` decimal(10,2) DEFAULT NULL,
  `additional_charges` decimal(10,2) DEFAULT NULL,
  `final_amount` decimal(10,2) DEFAULT NULL,
  `due_days` int DEFAULT NULL,
  `date_ss` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `care_of_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_line_one` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_line_two` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobile_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `payed_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `netamount` decimal(10,2) DEFAULT NULL,
  `newamount` decimal(10,2) DEFAULT NULL,
  `last_interest_calculation_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mastercity`
--

CREATE TABLE `mastercity` (
  `city_id` int NOT NULL,
  `city_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pincode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masterjeweltype`
--

CREATE TABLE `masterjeweltype` (
  `jeweltype_id` int NOT NULL,
  `jeweltype_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masterloanscheme`
--

CREATE TABLE `masterloanscheme` (
  `masterloanscheme_id` int NOT NULL,
  `masterloan_scheme` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masterpurity`
--

CREATE TABLE `masterpurity` (
  `masterpurity_id` int NOT NULL,
  `master_purity` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masterrelationship`
--

CREATE TABLE `masterrelationship` (
  `relationship_id` int NOT NULL,
  `relation_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `masterstate`
--

CREATE TABLE `masterstate` (
  `state_id` int NOT NULL,
  `state_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partpayment`
--

CREATE TABLE `partpayment` (
  `partpayment_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `paid_interest` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `totalpayment_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest_balance` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count500` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count200` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count100` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count50` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count20` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count10` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count5` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partpaymentinterest`
--

CREATE TABLE `partpaymentinterest` (
  `partpaymentinterest_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partpaymentpaymentamount`
--

CREATE TABLE `partpaymentpaymentamount` (
  `partpaymentpaymentamount_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profitandlosscredit`
--

CREATE TABLE `profitandlosscredit` (
  `profitandloss_credit_receipt_no` int NOT NULL,
  `profitandloss_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandloss_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandloss_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profitandlosscreditdb`
--

CREATE TABLE `profitandlosscreditdb` (
  `profitandlosscreditdb_id` int NOT NULL,
  `profitandlossdb_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_credit_particular` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profitandlossdebit`
--

CREATE TABLE `profitandlossdebit` (
  `profitandloss_debit_receipt_id` int NOT NULL,
  `profitandloss_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandloss_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandloss_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profitandlossdebitdb`
--

CREATE TABLE `profitandlossdebitdb` (
  `profitandlossdebitdb_id` int NOT NULL,
  `profitandlossdb_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profitandlossdb_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repledgeowner`
--

CREATE TABLE `repledgeowner` (
  `bank_id` int NOT NULL,
  `bank_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `repledge_date` date NOT NULL,
  `packet_no` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `count` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total_weight` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest_rate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `document_copy` varchar(235) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remarks` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salarydetails`
--

CREATE TABLE `salarydetails` (
  `salarydetail_id` int NOT NULL,
  `employee_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total_working_days` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total_leave_days` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salary_perday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salary_amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settlement`
--

CREATE TABLE `settlement` (
  `settlement_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `additional_charge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adjustment_charge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loanamount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `s_count500` int NOT NULL,
  `s_count200` int NOT NULL,
  `s_count100` int NOT NULL,
  `s_count50` int NOT NULL,
  `s_count20` int NOT NULL,
  `s_count10` int NOT NULL,
  `S_count5` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `S_count2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `S_count1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settlementadditionalamount`
--

CREATE TABLE `settlementadditionalamount` (
  `settlementadditionalamount_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `additional_charge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settlementadjustmentamount`
--

CREATE TABLE `settlementadjustmentamount` (
  `settlementadjustmentamount_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `adjustment_charge` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settlementinterest`
--

CREATE TABLE `settlementinterest` (
  `settlementinterest_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `interest1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settlementloanamount`
--

CREATE TABLE `settlementloanamount` (
  `settlementloanamount_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loanamount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suspencecredit`
--

CREATE TABLE `suspencecredit` (
  `suspence_credit_recipt_id` int NOT NULL,
  `suspence_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suspencecreditdb`
--

CREATE TABLE `suspencecreditdb` (
  `suspencecreditdb_id` int NOT NULL,
  `suspence_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_credit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_credit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suspencedebit`
--

CREATE TABLE `suspencedebit` (
  `suspence_debit_recipt_id` int NOT NULL,
  `suspence_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suspencedebitdb`
--

CREATE TABLE `suspencedebitdb` (
  `suspencedebitdb_id` int NOT NULL,
  `suspence_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_debit_receipt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_debit_particular` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `suspence_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `totalloanvalue`
--

CREATE TABLE `totalloanvalue` (
  `totalloanvalue_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `total_amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `final_amount` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount500` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount200` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount100` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount50` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount20` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount10` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount5` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount2` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lcount1` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `transaction_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferbankcredit`
--

CREATE TABLE `transferbankcredit` (
  `transferbankcredit_receipt_id` int NOT NULL,
  `transferbank_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferbank_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferbank_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferbankdebit`
--

CREATE TABLE `transferbankdebit` (
  `transferbankdebit_receipt_id` int NOT NULL,
  `transferbank_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferbank_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferbank_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transfercapitalcredit`
--

CREATE TABLE `transfercapitalcredit` (
  `transfercapitalcredit_receipt_id` int NOT NULL,
  `transfercapital_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfercapital_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfercapital_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transfercapitaldebit`
--

CREATE TABLE `transfercapitaldebit` (
  `transfercapitaldebit_receipt_id` int NOT NULL,
  `transfercapital_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfercapital_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfercapital_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferexpencescredit`
--

CREATE TABLE `transferexpencescredit` (
  `transferexpencescredit_receipt_id` int NOT NULL,
  `transferexpences_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_credit_particular` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferexpencesdebit`
--

CREATE TABLE `transferexpencesdebit` (
  `transferexpencesdebit_receipt_id` int NOT NULL,
  `transferexpences_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_debit_particular` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferexpences_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferfurniturecredit`
--

CREATE TABLE `transferfurniturecredit` (
  `transferfurniturecredit_receipt_id` int NOT NULL,
  `transferfurniture_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferfurniture_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferfurniture_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferfurnituredebit`
--

CREATE TABLE `transferfurnituredebit` (
  `transferfurnituredebit_receipt_id` int NOT NULL,
  `transferfurniture_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferfurniture_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferfurniture_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferjewelloancredit`
--

CREATE TABLE `transferjewelloancredit` (
  `transferjewelloancredit_receipt_id` int NOT NULL,
  `transferjewelloan_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferjewelloan_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferjewelloan_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferjewelloandebit`
--

CREATE TABLE `transferjewelloandebit` (
  `transferjewelloandebit_receipt_id` int NOT NULL,
  `transferjewelloan_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferjewelloan_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferjewelloan_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferprofitandlosscredit`
--

CREATE TABLE `transferprofitandlosscredit` (
  `transferprofitandlosscredit_receipt_id` int NOT NULL,
  `transferprofitandloss_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferprofitandloss_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferprofitandloss_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transferprofitandlossdebit`
--

CREATE TABLE `transferprofitandlossdebit` (
  `transferprofitandlossdebit_receipt_id` int NOT NULL,
  `transferprofitandloss_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferprofitandloss_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transferprofitandloss_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transfersuspencecredit`
--

CREATE TABLE `transfersuspencecredit` (
  `transfersuspencecredit_receipt_id` int NOT NULL,
  `transfersuspence_credit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfersuspence_credit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfersuspence_credit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transfersuspencedebit`
--

CREATE TABLE `transfersuspencedebit` (
  `transfersuspencedebit_receipt_id` int NOT NULL,
  `transfersuspence_debit_amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfersuspence_debit_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `transfersuspence_debit_date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userlog`
--

CREATE TABLE `userlog` (
  `log_id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `loginTime` date DEFAULT NULL,
  `ip_address` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `flat_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `landmark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `district` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `branch_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `email`, `phone_no`, `password`, `flat_no`, `address`, `landmark`, `country`, `state`, `district`, `user_type`, `branch_code`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@vinsupinfotech.com', '1234567890', '$2b$10$oUGuvhflgi5yRwFuiMhZL.bQjHO9deZlwPGifCoU7IPbh7lVvohWm', '', '', '', '', '', '', 'admin', '', '2023-10-17 14:53:37', '2023-11-16 05:04:58'),
(14, 'superadmin', 'superadmin@gmail.com', '123456789', '$2b$10$oUGuvhflgi5yRwFuiMhZL.bQjHO9deZlwPGifCoU7IPbh7lVvohWm', '', '', '', '', '', '', 'superadmin', '', '2023-10-31 12:49:09', '2023-11-16 05:05:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendancedetails`
--
ALTER TABLE `attendancedetails`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `balancesheet`
--
ALTER TABLE `balancesheet`
  ADD PRIMARY KEY (`balancesheet_id`);

--
-- Indexes for table `bankcredit`
--
ALTER TABLE `bankcredit`
  ADD PRIMARY KEY (`bankaccount_credit_receipt_no`);

--
-- Indexes for table `bankcreditdb`
--
ALTER TABLE `bankcreditdb`
  ADD PRIMARY KEY (`bankcreditdb_id`);

--
-- Indexes for table `bankdebit`
--
ALTER TABLE `bankdebit`
  ADD PRIMARY KEY (`bankaccount_debit_receipt_no`);

--
-- Indexes for table `bankdebitdb`
--
ALTER TABLE `bankdebitdb`
  ADD PRIMARY KEY (`bankdebitdb_id`);

--
-- Indexes for table `capitalcredit`
--
ALTER TABLE `capitalcredit`
  ADD PRIMARY KEY (`capital_credit_receipt_no`);

--
-- Indexes for table `capitalcreditdb`
--
ALTER TABLE `capitalcreditdb`
  ADD PRIMARY KEY (`capitalcreditdb_id`);

--
-- Indexes for table `capitaldebit`
--
ALTER TABLE `capitaldebit`
  ADD PRIMARY KEY (`capital_debit_receipt_no`);

--
-- Indexes for table `capitaldebitdb`
--
ALTER TABLE `capitaldebitdb`
  ADD PRIMARY KEY (`capitaldebitdb_id`);

--
-- Indexes for table `cashonhandcredit`
--
ALTER TABLE `cashonhandcredit`
  ADD PRIMARY KEY (`cash_on_hand_credit_id`);

--
-- Indexes for table `cashonhanddebit`
--
ALTER TABLE `cashonhanddebit`
  ADD PRIMARY KEY (`cash_on_hand_debit_id`);

--
-- Indexes for table `cashscroll`
--
ALTER TABLE `cashscroll`
  ADD PRIMARY KEY (`cashscroll_id`);

--
-- Indexes for table `cashscrolldenomination`
--
ALTER TABLE `cashscrolldenomination`
  ADD PRIMARY KEY (`CashScrolldenomination_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customerlogin`
--
ALTER TABLE `customerlogin`
  ADD PRIMARY KEY (`customerlogin_id`);

--
-- Indexes for table `employeeregistration`
--
ALTER TABLE `employeeregistration`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `expencescredit`
--
ALTER TABLE `expencescredit`
  ADD PRIMARY KEY (`expences_credit_receipt_id`);

--
-- Indexes for table `expencescreditdb`
--
ALTER TABLE `expencescreditdb`
  ADD PRIMARY KEY (`expencescreditdb_id`);

--
-- Indexes for table `expencesdebit`
--
ALTER TABLE `expencesdebit`
  ADD PRIMARY KEY (`expences_debit_receipt_id`);

--
-- Indexes for table `expencesdebitdb`
--
ALTER TABLE `expencesdebitdb`
  ADD PRIMARY KEY (`expencesdebitdb_id`);

--
-- Indexes for table `furniturecredit`
--
ALTER TABLE `furniturecredit`
  ADD PRIMARY KEY (`furniture_credit_receipt_no`);

--
-- Indexes for table `furniturecreditdb`
--
ALTER TABLE `furniturecreditdb`
  ADD PRIMARY KEY (`furniturecreditdb_id`);

--
-- Indexes for table `furnituredebit`
--
ALTER TABLE `furnituredebit`
  ADD PRIMARY KEY (`furniture_debit_receipt_no`);

--
-- Indexes for table `furnituredebitdb`
--
ALTER TABLE `furnituredebitdb`
  ADD PRIMARY KEY (`furnituredebitdb_id`);

--
-- Indexes for table `goldrate`
--
ALTER TABLE `goldrate`
  ADD PRIMARY KEY (`goldrate_id`);

--
-- Indexes for table `interest_table`
--
ALTER TABLE `interest_table`
  ADD PRIMARY KEY (`interest_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `jeweldetail`
--
ALTER TABLE `jeweldetail`
  ADD PRIMARY KEY (`jewel_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `jewelloancredit`
--
ALTER TABLE `jewelloancredit`
  ADD PRIMARY KEY (`jewelloan_credit_receipt_no`);

--
-- Indexes for table `jewelloancreditdb`
--
ALTER TABLE `jewelloancreditdb`
  ADD PRIMARY KEY (`jewelloancreditdb_id`);

--
-- Indexes for table `jewelloandebit`
--
ALTER TABLE `jewelloandebit`
  ADD PRIMARY KEY (`jewelloan_debit_receipt_no`);

--
-- Indexes for table `jewelloandebitdb`
--
ALTER TABLE `jewelloandebitdb`
  ADD PRIMARY KEY (`jewelloandebitdb_id`);

--
-- Indexes for table `loanapprovaldetails`
--
ALTER TABLE `loanapprovaldetails`
  ADD PRIMARY KEY (`loan_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `mastercity`
--
ALTER TABLE `mastercity`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `masterjeweltype`
--
ALTER TABLE `masterjeweltype`
  ADD PRIMARY KEY (`jeweltype_id`);

--
-- Indexes for table `masterloanscheme`
--
ALTER TABLE `masterloanscheme`
  ADD PRIMARY KEY (`masterloanscheme_id`);

--
-- Indexes for table `masterpurity`
--
ALTER TABLE `masterpurity`
  ADD PRIMARY KEY (`masterpurity_id`);

--
-- Indexes for table `masterrelationship`
--
ALTER TABLE `masterrelationship`
  ADD PRIMARY KEY (`relationship_id`);

--
-- Indexes for table `masterstate`
--
ALTER TABLE `masterstate`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `partpayment`
--
ALTER TABLE `partpayment`
  ADD PRIMARY KEY (`partpayment_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `partpaymentinterest`
--
ALTER TABLE `partpaymentinterest`
  ADD PRIMARY KEY (`partpaymentinterest_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `partpaymentpaymentamount`
--
ALTER TABLE `partpaymentpaymentamount`
  ADD PRIMARY KEY (`partpaymentpaymentamount_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `profitandlosscredit`
--
ALTER TABLE `profitandlosscredit`
  ADD PRIMARY KEY (`profitandloss_credit_receipt_no`);

--
-- Indexes for table `profitandlosscreditdb`
--
ALTER TABLE `profitandlosscreditdb`
  ADD PRIMARY KEY (`profitandlosscreditdb_id`);

--
-- Indexes for table `profitandlossdebit`
--
ALTER TABLE `profitandlossdebit`
  ADD PRIMARY KEY (`profitandloss_debit_receipt_id`);

--
-- Indexes for table `profitandlossdebitdb`
--
ALTER TABLE `profitandlossdebitdb`
  ADD PRIMARY KEY (`profitandlossdebitdb_id`);

--
-- Indexes for table `repledgeowner`
--
ALTER TABLE `repledgeowner`
  ADD PRIMARY KEY (`bank_id`);

--
-- Indexes for table `settlement`
--
ALTER TABLE `settlement`
  ADD PRIMARY KEY (`settlement_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `settlementadditionalamount`
--
ALTER TABLE `settlementadditionalamount`
  ADD PRIMARY KEY (`settlementadditionalamount_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `settlementadjustmentamount`
--
ALTER TABLE `settlementadjustmentamount`
  ADD PRIMARY KEY (`settlementadjustmentamount_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `settlementinterest`
--
ALTER TABLE `settlementinterest`
  ADD PRIMARY KEY (`settlementinterest_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `settlementloanamount`
--
ALTER TABLE `settlementloanamount`
  ADD PRIMARY KEY (`settlementloanamount_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `suspencecredit`
--
ALTER TABLE `suspencecredit`
  ADD PRIMARY KEY (`suspence_credit_recipt_id`);

--
-- Indexes for table `suspencecreditdb`
--
ALTER TABLE `suspencecreditdb`
  ADD PRIMARY KEY (`suspencecreditdb_id`);

--
-- Indexes for table `suspencedebit`
--
ALTER TABLE `suspencedebit`
  ADD PRIMARY KEY (`suspence_debit_recipt_id`);

--
-- Indexes for table `suspencedebitdb`
--
ALTER TABLE `suspencedebitdb`
  ADD PRIMARY KEY (`suspencedebitdb_id`);

--
-- Indexes for table `totalloanvalue`
--
ALTER TABLE `totalloanvalue`
  ADD PRIMARY KEY (`totalloanvalue_id`),
  ADD UNIQUE KEY `loan_id_2` (`loan_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `loan_id` (`loan_id`);

--
-- Indexes for table `transferbankcredit`
--
ALTER TABLE `transferbankcredit`
  ADD PRIMARY KEY (`transferbankcredit_receipt_id`);

--
-- Indexes for table `transferbankdebit`
--
ALTER TABLE `transferbankdebit`
  ADD PRIMARY KEY (`transferbankdebit_receipt_id`);

--
-- Indexes for table `transfercapitalcredit`
--
ALTER TABLE `transfercapitalcredit`
  ADD PRIMARY KEY (`transfercapitalcredit_receipt_id`);

--
-- Indexes for table `transfercapitaldebit`
--
ALTER TABLE `transfercapitaldebit`
  ADD PRIMARY KEY (`transfercapitaldebit_receipt_id`);

--
-- Indexes for table `transferexpencescredit`
--
ALTER TABLE `transferexpencescredit`
  ADD PRIMARY KEY (`transferexpencescredit_receipt_id`);

--
-- Indexes for table `transferexpencesdebit`
--
ALTER TABLE `transferexpencesdebit`
  ADD PRIMARY KEY (`transferexpencesdebit_receipt_id`);

--
-- Indexes for table `transferfurniturecredit`
--
ALTER TABLE `transferfurniturecredit`
  ADD PRIMARY KEY (`transferfurniturecredit_receipt_id`);

--
-- Indexes for table `transferfurnituredebit`
--
ALTER TABLE `transferfurnituredebit`
  ADD PRIMARY KEY (`transferfurnituredebit_receipt_id`);

--
-- Indexes for table `transferjewelloancredit`
--
ALTER TABLE `transferjewelloancredit`
  ADD PRIMARY KEY (`transferjewelloancredit_receipt_id`);

--
-- Indexes for table `transferjewelloandebit`
--
ALTER TABLE `transferjewelloandebit`
  ADD PRIMARY KEY (`transferjewelloandebit_receipt_id`);

--
-- Indexes for table `transferprofitandlosscredit`
--
ALTER TABLE `transferprofitandlosscredit`
  ADD PRIMARY KEY (`transferprofitandlosscredit_receipt_id`);

--
-- Indexes for table `transferprofitandlossdebit`
--
ALTER TABLE `transferprofitandlossdebit`
  ADD PRIMARY KEY (`transferprofitandlossdebit_receipt_id`);

--
-- Indexes for table `transfersuspencecredit`
--
ALTER TABLE `transfersuspencecredit`
  ADD PRIMARY KEY (`transfersuspencecredit_receipt_id`);

--
-- Indexes for table `transfersuspencedebit`
--
ALTER TABLE `transfersuspencedebit`
  ADD PRIMARY KEY (`transfersuspencedebit_receipt_id`);

--
-- Indexes for table `userlog`
--
ALTER TABLE `userlog`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_phone_no` (`phone_no`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendancedetails`
--
ALTER TABLE `attendancedetails`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `balancesheet`
--
ALTER TABLE `balancesheet`
  MODIFY `balancesheet_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bankcredit`
--
ALTER TABLE `bankcredit`
  MODIFY `bankaccount_credit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bankcreditdb`
--
ALTER TABLE `bankcreditdb`
  MODIFY `bankcreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bankdebit`
--
ALTER TABLE `bankdebit`
  MODIFY `bankaccount_debit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bankdebitdb`
--
ALTER TABLE `bankdebitdb`
  MODIFY `bankdebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `capitalcredit`
--
ALTER TABLE `capitalcredit`
  MODIFY `capital_credit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `capitalcreditdb`
--
ALTER TABLE `capitalcreditdb`
  MODIFY `capitalcreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `capitaldebit`
--
ALTER TABLE `capitaldebit`
  MODIFY `capital_debit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `capitaldebitdb`
--
ALTER TABLE `capitaldebitdb`
  MODIFY `capitaldebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashonhandcredit`
--
ALTER TABLE `cashonhandcredit`
  MODIFY `cash_on_hand_credit_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashonhanddebit`
--
ALTER TABLE `cashonhanddebit`
  MODIFY `cash_on_hand_debit_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashscroll`
--
ALTER TABLE `cashscroll`
  MODIFY `cashscroll_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashscrolldenomination`
--
ALTER TABLE `cashscrolldenomination`
  MODIFY `CashScrolldenomination_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customerlogin`
--
ALTER TABLE `customerlogin`
  MODIFY `customerlogin_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employeeregistration`
--
ALTER TABLE `employeeregistration`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expencescredit`
--
ALTER TABLE `expencescredit`
  MODIFY `expences_credit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expencescreditdb`
--
ALTER TABLE `expencescreditdb`
  MODIFY `expencescreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expencesdebit`
--
ALTER TABLE `expencesdebit`
  MODIFY `expences_debit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expencesdebitdb`
--
ALTER TABLE `expencesdebitdb`
  MODIFY `expencesdebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `furniturecredit`
--
ALTER TABLE `furniturecredit`
  MODIFY `furniture_credit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `furniturecreditdb`
--
ALTER TABLE `furniturecreditdb`
  MODIFY `furniturecreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `furnituredebit`
--
ALTER TABLE `furnituredebit`
  MODIFY `furniture_debit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `furnituredebitdb`
--
ALTER TABLE `furnituredebitdb`
  MODIFY `furnituredebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `goldrate`
--
ALTER TABLE `goldrate`
  MODIFY `goldrate_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `interest_table`
--
ALTER TABLE `interest_table`
  MODIFY `interest_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jeweldetail`
--
ALTER TABLE `jeweldetail`
  MODIFY `jewel_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewelloancredit`
--
ALTER TABLE `jewelloancredit`
  MODIFY `jewelloan_credit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewelloancreditdb`
--
ALTER TABLE `jewelloancreditdb`
  MODIFY `jewelloancreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewelloandebit`
--
ALTER TABLE `jewelloandebit`
  MODIFY `jewelloan_debit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewelloandebitdb`
--
ALTER TABLE `jewelloandebitdb`
  MODIFY `jewelloandebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loanapprovaldetails`
--
ALTER TABLE `loanapprovaldetails`
  MODIFY `loan_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mastercity`
--
ALTER TABLE `mastercity`
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `masterjeweltype`
--
ALTER TABLE `masterjeweltype`
  MODIFY `jeweltype_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `masterloanscheme`
--
ALTER TABLE `masterloanscheme`
  MODIFY `masterloanscheme_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `masterpurity`
--
ALTER TABLE `masterpurity`
  MODIFY `masterpurity_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `masterrelationship`
--
ALTER TABLE `masterrelationship`
  MODIFY `relationship_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `masterstate`
--
ALTER TABLE `masterstate`
  MODIFY `state_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partpayment`
--
ALTER TABLE `partpayment`
  MODIFY `partpayment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partpaymentinterest`
--
ALTER TABLE `partpaymentinterest`
  MODIFY `partpaymentinterest_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partpaymentpaymentamount`
--
ALTER TABLE `partpaymentpaymentamount`
  MODIFY `partpaymentpaymentamount_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profitandlosscredit`
--
ALTER TABLE `profitandlosscredit`
  MODIFY `profitandloss_credit_receipt_no` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profitandlosscreditdb`
--
ALTER TABLE `profitandlosscreditdb`
  MODIFY `profitandlosscreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profitandlossdebit`
--
ALTER TABLE `profitandlossdebit`
  MODIFY `profitandloss_debit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profitandlossdebitdb`
--
ALTER TABLE `profitandlossdebitdb`
  MODIFY `profitandlossdebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `repledgeowner`
--
ALTER TABLE `repledgeowner`
  MODIFY `bank_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settlement`
--
ALTER TABLE `settlement`
  MODIFY `settlement_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settlementadditionalamount`
--
ALTER TABLE `settlementadditionalamount`
  MODIFY `settlementadditionalamount_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settlementadjustmentamount`
--
ALTER TABLE `settlementadjustmentamount`
  MODIFY `settlementadjustmentamount_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settlementinterest`
--
ALTER TABLE `settlementinterest`
  MODIFY `settlementinterest_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settlementloanamount`
--
ALTER TABLE `settlementloanamount`
  MODIFY `settlementloanamount_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suspencecredit`
--
ALTER TABLE `suspencecredit`
  MODIFY `suspence_credit_recipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suspencecreditdb`
--
ALTER TABLE `suspencecreditdb`
  MODIFY `suspencecreditdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suspencedebit`
--
ALTER TABLE `suspencedebit`
  MODIFY `suspence_debit_recipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suspencedebitdb`
--
ALTER TABLE `suspencedebitdb`
  MODIFY `suspencedebitdb_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `totalloanvalue`
--
ALTER TABLE `totalloanvalue`
  MODIFY `totalloanvalue_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferbankcredit`
--
ALTER TABLE `transferbankcredit`
  MODIFY `transferbankcredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferbankdebit`
--
ALTER TABLE `transferbankdebit`
  MODIFY `transferbankdebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfercapitalcredit`
--
ALTER TABLE `transfercapitalcredit`
  MODIFY `transfercapitalcredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfercapitaldebit`
--
ALTER TABLE `transfercapitaldebit`
  MODIFY `transfercapitaldebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferexpencescredit`
--
ALTER TABLE `transferexpencescredit`
  MODIFY `transferexpencescredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferexpencesdebit`
--
ALTER TABLE `transferexpencesdebit`
  MODIFY `transferexpencesdebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferfurniturecredit`
--
ALTER TABLE `transferfurniturecredit`
  MODIFY `transferfurniturecredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferfurnituredebit`
--
ALTER TABLE `transferfurnituredebit`
  MODIFY `transferfurnituredebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferjewelloancredit`
--
ALTER TABLE `transferjewelloancredit`
  MODIFY `transferjewelloancredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferjewelloandebit`
--
ALTER TABLE `transferjewelloandebit`
  MODIFY `transferjewelloandebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferprofitandlosscredit`
--
ALTER TABLE `transferprofitandlosscredit`
  MODIFY `transferprofitandlosscredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transferprofitandlossdebit`
--
ALTER TABLE `transferprofitandlossdebit`
  MODIFY `transferprofitandlossdebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfersuspencecredit`
--
ALTER TABLE `transfersuspencecredit`
  MODIFY `transfersuspencecredit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfersuspencedebit`
--
ALTER TABLE `transfersuspencedebit`
  MODIFY `transfersuspencedebit_receipt_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userlog`
--
ALTER TABLE `userlog`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `interest_table`
--
ALTER TABLE `interest_table`
  ADD CONSTRAINT `interest_table_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `jeweldetail`
--
ALTER TABLE `jeweldetail`
  ADD CONSTRAINT `jeweldetail_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `loanapprovaldetails`
--
ALTER TABLE `loanapprovaldetails`
  ADD CONSTRAINT `loanapprovaldetails_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `partpayment`
--
ALTER TABLE `partpayment`
  ADD CONSTRAINT `partpayment_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `partpaymentinterest`
--
ALTER TABLE `partpaymentinterest`
  ADD CONSTRAINT `partpaymentinterest_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `partpaymentpaymentamount`
--
ALTER TABLE `partpaymentpaymentamount`
  ADD CONSTRAINT `partpaymentpaymentamount_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `settlement`
--
ALTER TABLE `settlement`
  ADD CONSTRAINT `settlement_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `settlementadditionalamount`
--
ALTER TABLE `settlementadditionalamount`
  ADD CONSTRAINT `settlementadditionalamount_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `settlementadjustmentamount`
--
ALTER TABLE `settlementadjustmentamount`
  ADD CONSTRAINT `settlementadjustmentamount_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `settlementinterest`
--
ALTER TABLE `settlementinterest`
  ADD CONSTRAINT `settlementinterest_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `settlementloanamount`
--
ALTER TABLE `settlementloanamount`
  ADD CONSTRAINT `settlementloanamount_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `totalloanvalue`
--
ALTER TABLE `totalloanvalue`
  ADD CONSTRAINT `totalloanvalue_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loanapprovaldetails` (`loan_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
