const loginHandler = (req, res, pg, bcrypt) => {
  const { username, password, position } = req.body;

  if (!password || !username) {
    res.status(404).send("Incorrect form submission");
  }
  pg.select("pass_hash", "user_id", "email", "position")
    .from("login")
    .where("username", "=", username)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].pass_hash);
      if (isValid && data[0].position === position) {
        return pg
          .select("*")
          .from("login")
          .where("user_id", "=", data[0].user_id)
          .then(response => {
            res.json(response[0]);
          })
          .catch(err => {
            res.status(500).send("Unable to get the data from the server");
          });
      } else {
        res.status(400).send("Wrong Credentials");
      }
    })
    .catch(err => {
      res.status(400).send("Wrong Credentials");
    });
};

module.exports = {
  loginHandler: loginHandler
};
