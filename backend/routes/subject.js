const express = require("express");
const router = express.Router();
const Subject = require("../models/Other/Subject");

// Get Subjects by semester and branch
router.post("/getSubject", async (req, res) => {
  try {
    let subject = await Subject.find(req.body);
    if (!subject || subject.length === 0) {
      return res
          .status(400)
          .json({ success: false, message: "No Subject Available" });
    }
    const data = {
      success: true,
      message: "All Subject Loaded!",
      subject,
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Add a new Subject
router.post("/addSubject", async (req, res) => {
  let { name, code, semester, branch } = req.body;
  try {
    let subject = await Subject.findOne({ code });
    if (subject) {
      return res
          .status(400)
          .json({ success: false, message: "Subject Already Exists" });
    }
    await Subject.create({
      name,
      code,
      semester,
      branch
    });
    const data = {
      success: true,
      message: "Subject Added!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete a Subject by ID
router.delete("/deleteSubject/:id", async (req, res) => {
  try {
    let subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res
          .status(400)
          .json({ success: false, message: "No Subject Exists!" });
    }
    const data = {
      success: true,
      message: "Subject Deleted!",
    };
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
