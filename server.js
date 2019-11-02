const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");

const login = require("./controllers/loginHandler").loginHandler;
const register = require("./controllers/registrationHandler");
const {
  patientInsertionHandler,
  patientRetriever,
  patientRetrieveByDoctorAppointed,
  patientRetrieveByTheirNames
} = require("./controllers/patientHandler");
const updateDetails = require("./controllers/detailsUpdater");

const pg = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "sourav",
    password: "sourav",
    database: "HospitalManagementSystem"
  }
});

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors()); //Middleware to make connection between http and https protocols
app.use(express.json()); //Using middleware to preprocess the received data for a more relevant data

app.post("/login", (req, res) => {
  login(req, res, pg, bcrypt);
});

app.post("/register", (req, res) => {
  register.registrationHandler(req, res, pg, bcrypt);
});

app.post("/insert_patient", (req, res) => {
  patientInsertionHandler(req, res, pg);
});

app.post("/get_patients", (req, res) => {
  patientRetriever(res, pg);
});

app.post("/get_patient_by_name", (req, res) => {
  patientRetrieveByTheirNames(res, pg, req.body.name);
});

app.post("/get_patient_by_doctor_appointed", (req, res) => {
  patientRetrieveByDoctorAppointed(res, pg, req.body.doctorName);
});

app.put("/patient_details", (req, res) => {
  updateDetails.patientDetailUpdater(req, res);
});

app.put("/user_details", (req, res) => {
  updateDetails.userDetailUpdater(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
