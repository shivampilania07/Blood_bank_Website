//Create Inventory

const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role != "donar") {
    //   throw new Error("Not a Donar Account");
    // }
    // if (inventoryType === "out" && user.role != "hospital") {
    //   throw new Error("Not a Hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.userId);

      //calculate Blood Quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      //console.log("Total in", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //Calculate OUT BLOOD QUANTITY

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      //validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save the record
    req.body.organization = req.userId;
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create Inventory API",
      error,
    });
  }
};

//GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    let inventory = [];

    // ONLY ORGANIZATION CAN SEE INVENTORY
    if (user.role === "organization") {
      inventory = await inventoryModel
        .find({
          organization: req.userId,
        })
        .populate("donar")
        .populate("hospital")
        .populate("organization")
        .sort({ createdAt: -1 });
    }

    return res.status(200).send({
      success: true,
      inventory,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error In Get Inventory",
      error,
    });
  }
};

//GET HOSPITAL CONSUMER RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    let inventory = [];

    // ONLY HOSPITAL CAN SEE THIS DATA
    if (user.role === "hospital") {
      inventory = await inventoryModel
        .find({
          hospital: req.userId,
        })
        .populate("donar")
        .populate("hospital")
        .populate("organization")
        .sort({ createdAt: -1 });
    } else if (user.role === "donar") {
      inventory = await inventoryModel
        .find({
          donar: req.userId,
          inventoryType: "in",
        })
        .populate("organization")
        .sort({ createdAt: -1 });
    }

    return res.status(200).send({
      success: true,
      message: "Hospital Consumer Record Fetched Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};

//GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.userId,
      })

      .sort({ createdAt: -1 })
      .limit(3);
    return res.status(200).send({
      success: true,
      message: "Recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Recent Inventory API",
      error,
    });
  }
};

//GET DONAR RECORDS
const getDonarsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (user.role !== "organization") {
      return res.status(200).send({
        success: true,
        donars: [],
      });
    }

    const organization = req.userId;

    const donorId = await inventoryModel.distinct("donar", {
      organization,
    });

    const donars = await userModel.find({
      _id: { $in: donorId },
    });

    return res.status(200).send({
      success: true,
      donars,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in Donar Records",
      error,
    });
  }
};

//GET HOSPITAL RECORDS
const getHospitalController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    // ONLY ORGANIZATION CAN SEE HOSPITAL DATA
    if (user.role !== "organization") {
      return res.status(200).send({
        success: true,
        hospital: [],
      });
    }

    const organization = req.userId;

    // THIS WAS MISSING
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });

    const hospital = await userModel.find({
      _id: { $in: hospitalId },
    });

    return res.status(200).send({
      success: true,
      message: "Hospital Data Fetched Successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error in Hospital Records",
      error,
    });
  }
};

//GET ORG PROFILES
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });
    //find org
    const organizations = await userModel.find({
      _id: { $in: orgId },
      role: "organization",
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched SuccessFully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "ERROR in ORG API",
      error,
    });
  }
};

//GET ORG-HOSPITAL PROFILES
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    //find org
    const organizations = await userModel.find({
      _id: { $in: orgId },
      role: "organization",
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched SuccessFully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "ERROR in HospitalORG API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
