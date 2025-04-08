const express = require("express");
const router = express.Router();
const facultyDetails = require("../../models/Faculty/FacultyDetails");

// Get faculty details
router.post("/getDetails", async (req, res) => {
  try {
    let users = await facultyDetails.find(req.body);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No Faculty Found" });
    }
    res.json({
      success: true,
      message: "Faculty Details Found!",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Add new faculty
router.post("/addDetails", async (req, res) => {
  try {
    let existing = await facultyDetails.findOne({
      employeeId: req.body.employeeId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Faculty With This EmployeeId Already Exists",
      });
    }
    let newFaculty = await facultyDetails.create(req.body);
    res.status(201).json({
      success: true,
      message: "Faculty Details Added!",
      newFaculty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update faculty details
router.post("/updateDetails/:id", async (req, res) => {
  try {
    let updated = await facultyDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "No Faculty Found",
      });
    }
    res.json({
      success: true,
      message: "Updated Successfully!",
      updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete faculty
router.delete("/deleteDetails/:id", async (req, res) => {
  try {
    let deleted = await facultyDetails.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "No Faculty Found",
      });
    }
    res.json({
      success: true,
      message: "Deleted Successfully!",
      deleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get count of faculty
router.get("/count", async (req, res) => {
  try {
    let count = await facultyDetails.countDocuments(req.body);
    res.json({
      success: true,
      message: "Count Successful!",
      count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
});

module.exports = router;