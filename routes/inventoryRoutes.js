const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddleware, getInventoryController);

//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController,
);

//GET HOSPITAL CONSUMER RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController,
);

//GET ALL DONAR RECORDS
router.get("/get-donars", authMiddleware, getDonarsController);

//GET ALL HOSPITAL DETAILS
router.get("/get-hospital", authMiddleware, getHospitalController);

//GET ALL ORG DETAILS
router.get("/get-organization", authMiddleware, getOrganizationController);

//GET ALL ORG DETAILS
router.get(
  "/get-organization-for-hospital",
  authMiddleware,
  getOrganizationForHospitalController,
);

module.exports = router;
