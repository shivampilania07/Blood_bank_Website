const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//Routes
const router = express.Router();

//GET || DONAR LIST
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController,
);

//GET || HOSPITAL LIST
router.get(
  "/hospital-list",
  authMiddleware,
  adminMiddleware,
  getHospitalListController,
);

//GET || ORGANIZATION
router.get("/org-list", authMiddleware, adminMiddleware, getOrgListController);

//DELETE || DONAR || GET
router.delete(
  "/delete-donar/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonarController,
);

//DELETE || HOSPITAL || GET
router.delete(
  "/delete-hospital/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospitalController,
);

//DELETE || HOSPITAL || GET
router.delete(
  "/delete-org/:id",
  authMiddleware,
  adminMiddleware,
  deleteOrgController,
);

//EXPORT
module.exports = router;
