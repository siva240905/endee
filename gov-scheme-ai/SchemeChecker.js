import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaMoneyBill, FaBriefcase, FaCheckCircle } from "react-icons/fa";
import "./SchemeChecker.css";

function SchemeChecker() {

  const [formData, setFormData] = useState({
    age: "",
    income: "",
    caste: "",
    occupation: ""
  });

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "ta-IN";   // Tamil language
  recognition.start();

  recognition.onresult = (event) => {

    const speech = event.results[0][0].transcript;

    console.log("User said:", speech);

    handleTamilCommand(speech);

  };
  const handleTamilCommand = (text) => {

  const lower = text.toLowerCase();

  if (lower.includes("விவசாயி")) {

    speakTamil("நீங்கள் PM கிசான் திட்டத்திற்கு தகுதியானவர்.");

  }

  else if (lower.includes("மாணவர்")) {

    speakTamil("நீங்கள் National Scholarship திட்டத்திற்கு தகுதியானவர்.");

  }

  else {

    speakTamil("மன்னிக்கவும். உங்கள் விவரங்களை மீண்டும் சொல்லுங்கள்.");

  }

};
const speakTamil = (text) => {

  const speech = new SpeechSynthesisUtterance();

  speech.lang = "ta-IN";
  speech.text = text;

  window.speechSynthesis.speak(speech);

};
};
  const checkEligibility = async () => {

  try {

    setLoading(true);

    const payload = {
      age: Number(formData.age),
      income: Number(formData.income),
      caste: formData.caste,
      occupation: formData.occupation
    };

    const res = await axios.post(
      "http://localhost:5000/check-eligibility",
      payload
    );

    setSchemes(res.data.eligible);

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};
const micBtn = {
  padding: "10px 15px",
  background: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(45deg,#ff7e5f,#feb47b)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  margin: "20px 0",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
};

const applyBtn = {
  marginTop: "10px",
  padding: "10px 15px",
  background: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
 return (
  <div style={{
    fontFamily: "Arial",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px"
  }}>

    <h1 style={{ textAlign: "center", color: "#2c3e50" }}>
      AI Government Scheme Assistant
    </h1>

    <div style={{
      background: "white",
      padding: "20px",
      maxWidth: "500px",
      margin: "20px auto",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>

      <div className="inputBox">
  <FaUser className="icon"/>
  <input name="age" placeholder="Age" onChange={handleChange}/>
</div>

<div className="inputBox">
  <FaMoneyBill className="icon"/>
  <input name="income" placeholder="Annual Income" onChange={handleChange}/>
</div>

<div className="inputBox">
  <select name="caste" onChange={handleChange}>
    <option value="">Select Caste</option>
    <option value="General">General</option>
    <option value="OBC">OBC</option>
    <option value="SC">SC</option>
    <option value="ST">ST</option>
  </select>
</div>

<div className="inputBox">
  <FaBriefcase className="icon"/>
  <input name="occupation" placeholder="Occupation" onChange={handleChange}/>
</div>

    <button className="checkBtn" onClick={checkEligibility}>
  <FaCheckCircle/> Check Eligibility
</button>
{loading && <p className="loading">Checking eligibility...</p>}

    </div>

    <div style={{ maxWidth: "800px", margin: "auto" }}>
      {schemes.map((scheme, index) => (

        <div key={index} style={cardStyle}>

          <h2>{scheme.scheme_name}</h2>

          <p style={{ color: "#555" }}>
            {scheme.tamil_explanation}
          </p>

          <b>Required Documents:</b>

          <ul>
            {scheme.documents_required.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>

          <a
            href={scheme.official_link}
            target="_blank"
            rel="noreferrer"
          >
            <button style={applyBtn}>
              Apply Now
            </button>
          </a>
<button onClick={startListening} style={micBtn}>
🎤 Speak Tamil
</button>
        </div>

      ))}
    </div>

  </div>
);
}

export default SchemeChecker;