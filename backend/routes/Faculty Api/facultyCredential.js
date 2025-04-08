const express = require("express");
const router = express.Router();
const FacultyCredentials = require("../../models/Faculty/FacultyCredentials");

router.post("/login", (req, res) => {
  const { loginid, password } = req.body;
  if (Number(loginid) === 165 && password === "faculty123") {
    return res.json({
      success: true,
      message: "Login Successful!",
      loginid: "165",
      id: "static-id-165"
    });
  } else {
    return res.status(400).json({ success: false, message: "Wrong Credentials" });
  }
});

router.post("/register", async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await FacultyCredentials.findOne({ loginid });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User With This LoginId Already Exists",
      });
    }
    user = await FacultyCredentials.create({
      loginid,
      password,
    });
    const data = {
      success: true,
      message: "Register Successful!",
      loginid: user.loginid,
      id: user.id,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    let user = await FacultyCredentials.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    const data = {
      success: true,
      message: "Updated Successful!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await FacultyCredentials.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successful!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
