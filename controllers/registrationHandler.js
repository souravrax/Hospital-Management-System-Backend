const registrationHandler = (req, res, pg, bcrypt) => {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const { name, position, password, email, username } = req.body;
  console.log(emailRegExp.test(email) + " for email");
  console.log(passwordRegExp.test(password) + " for password");

  if (emailRegExp.test(email) && passwordRegExp.test(password)) {
    pg.select("name")
      .from("login")
      .where("username", "=", username)
      .then(data => {
        if (data[0] == undefined) {
          var hash = bcrypt.hashSync(password);

          pg("login")
            .insert({
              name: name,
              position: position,
              pass_hash: hash,
              email: email,
              username: username
            })
            .then(() => {
              console.log("Data inserted Successfully");
              pg.select("*")
                .from("login")
                .where("username", "=", username)
                .then(prom => {
                  res.json(prom);
                });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("User already exist");
          res.json({
            user_already_exist: true
          });
        }
      });
  } else {
    res.json({
      password_is_not_well_formated: true,
      email_is_invalid: true
    });
  }
};

module.exports = {
  registrationHandler: registrationHandler
};
