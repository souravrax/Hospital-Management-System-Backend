function patientInsertionHandler(req, res, db) {
  const {
    name,
    pContactNumber,
    sContactNumber,
    bloodGroup,
    married,
    partnerName,
    childrensNames,
    dob,
    sex,
    pEmail,
    address,
    townCity,
    pincode,
    state,
    country,
    doctorAppointed,
    criticalInformation,
    notes,
    imageURL
  } = req.body;

  db("patient_info")
    .insert({
      patient_name: name,
      primary_contact_no: pContactNumber,
      secondary_contact_number: sContactNumber,
      blood_group: bloodGroup,
      maritial_status: married ? "Married" : "Unmarried",
      partner_name: partnerName,
      childrens_name: childrensNames,
      dob: dob,
      sex: sex,
      primary_email: pEmail,
      address: address,
      town_city: townCity,
      pincode: pincode,
      state: state,
      country: country,
      doctor_appointed: doctorAppointed,
      critical_information: criticalInformation,
      notes: notes,
      image_url: imageURL
    })
    .then(() => {
      console.log("New patient details inserted successfully");
      res.status(200).send("New patient details inserted successfully");
    })
    .catch(err => {
      console.log("Something went wrong");
      res.status(404).send("Sorry for the inconvenience");
    });
}

const patientRetriever = (res, db) => {
  db.select("*")
    .from("patient_info")
    .then(info => {
      if (info.length === 0) {
        res.status.send("Sorry no patients found on the database");
      }
    })
    .catch("Sorry something went wrong");
};

const patientRetrieveByTheirNames = (res, db, name) => {
  db.select("*")
    .from("login")
    .where("patient_name", "=", name)
    .then(patients => {
      patients.length === 1 ? res.json(patients) : res.json(patients[0]);
      if (patients.length === 0) {
        res
          .status(404)
          .send(`Sorry patient with ${name} is not in the database`);
      }
    })
    .catch(err => {
      res.send(500).send(`Sorry something went wrong`);
    });
};

const patientRetrieveByDoctorAppointed = (res, db, doctor_name) => {
  db.select("*")
    .from("login")
    .where("doctor_appointed", "=", doctor_name)
    .then(patients => {
      patients.length === 1 ? res.json(patients) : res.json(patients[0]);
      if (patients.length === 0) {
        res
          .status(404)
          .send(`Sorry patient with ${name} is not in the database`);
      }
    })
    .catch(err => {
      res.send(500).send(`Sorry something went wrong`);
    });
};

module.exports = {
  patientInsertionHandler: patientInsertionHandler,
  patientRetriever: patientRetriever,
  patientRetrieveByDoctorAppointed: patientRetrieveByDoctorAppointed,
  patientRetrieveByTheirNames: patientRetrieveByTheirNames
};
