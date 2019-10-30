function patientHandler(req, res, db) {
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

module.exports = {
  patientHandler: patientHandler
};
