const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupHandler = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    // console.log(name,email,password);

    const findUser = await User.findOne({ email: email });
    if (name == "" || email == "" || password == "") {
      res
        .status(204)
        .json({ message: "Please fill all fields", success: "false" });
    }
    if (findUser) {
      res
        .status(403)
        .json({ message: "Email already exists", success: "false" });
    } else {
      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
      });
      res.json({
        message: "Account created successfully",
        succes: "true",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
};
const loginHandler = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
   
    if (!email || !password) {
      res
        .status(204)
        .json({ message: "Please fill all fields", success: "false" });
    } else {
      let user = await User.findOne({ email });
      if (!user) return res.sendStatus(401, "Invalid credentials");
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          email: user.email,
          password: user.password,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1m",
        });
        await User.findByIdAndUpdate(user._id,{token:token})
        return res
          .cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 10),
            httpOnly: true
          })
          .json({
            message: "Account verified",
            succes: "true",
          });
      }
    }
  } catch (err) {
    console.log("Error", err);
  }
};
module.exports = { signupHandler, loginHandler };
