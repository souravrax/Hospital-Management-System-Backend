const userDetailUpdater = (req, res)=>{
    res.send('Working user Details Updater');
}

const patientDetailUpdater = (req, res)=>{
    res.send('Working patient Details Updater');
}

module.exports = {
    userDetailUpdater, patientDetailUpdater
}