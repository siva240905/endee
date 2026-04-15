const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Import data
const schemes = require("./schemes.json");
const checkEligibility = require("./eligibility");

// Root test route
app.get("/", (req, res) => {
  res.send("Govt Scheme AI Backend Running");
});

// Get all schemes
app.get("/schemes", (req, res) => {
  res.json(schemes);
});

// Eligibility check API
app.post("/check-eligibility", (req, res) => {

  const user = req.body;

  const eligibleSchemes = [];

  schemes.forEach((scheme) => {
    if (checkEligibility(user, scheme)) {
      eligibleSchemes.push(scheme);
    }
  });

  res.json({
    eligible: eligibleSchemes
  });

});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});