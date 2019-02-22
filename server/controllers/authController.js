const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    dbInstance = req.app.get("db");
    const { username, password } = req.body;
    const result = await dbInstance.get_user([username]).catch(error => {
      res
        .status(500)
        .send({ errorMessage: "Something went wrong in GET USER IN REGISTER" });
      console.log("ERROR-----💥---->", error);
    });
    const existingUser = result[0];

    if (existingUser) {
      return res.status(409).send("Username taken");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await dbInstance
      .register_user([username, hash])
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Something went wrong in REGISTER" });
        console.log("ERROR-----💥---->", error);
      });
    const user = registeredUser[0];

    req.session.user = {
      isAdmin: user.is_admin,
      username: user.username,
      id: user.id
    };
    return res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await req.app.get("db").get_user([username]);
    const user = foundUser[0];
    if (!user) {
      return res
        .status(401)
        .send(
          "User not found Please register as a new user before logging in."
        );
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password");
    }
    req.session.user = {
      isAdmin: user.isAdmin,
      id: user.id,
      username: user.username
    };
    return res.send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("please log in");
    }
  }
};
