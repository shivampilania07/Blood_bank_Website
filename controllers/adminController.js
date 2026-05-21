const userModel = require("../models/userModel");

//GET DONAR LIST
const getDonarListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: donarData.length,
      message: "Donar list Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar LIST API",
      error,
    });
  }
};

//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: "Hospital list Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital LIST API",
      error,
    });
  }
};

//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      TotalCount: orgData.length,
      message: "Organization list Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Organization LIST API",
      error,
    });
  }
};

//DELETE DONAR
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Successfully deleted Donar Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Deleting Donar",
      error,
    });
  }
};

//DELETE HOSPITAL
const deleteHospitalController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Successfully deleted Hospital Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Deleting Hospital",
      error,
    });
  }
};

//DELETE ORG
const deleteOrgController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Successfully deleted Organization Data",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Deleting Organization",
      error,
    });
  }
};

//Export
module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
};
