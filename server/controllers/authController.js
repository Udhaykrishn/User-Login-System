const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const test = (req, res) => {
  res.json("test is working");
};

//Register Endpoint
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if name us entered
    if (!name) {
      return res.json({
        error: "Name is Required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 charaters long",
      });
    }

    //Check email
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.json({
        error: "Email is taken already ",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login Endpoint

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exitest
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    //Check if password is match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1m" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "password do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Profile Endpoint

const profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.json({ error: "Token Expired" });
        }
        return res.json({ error: "Invalid Token" });
      }
      res.json(user);
    });
  } else {
    res.json({});
  }
};

//Email Endpoint

const email = (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email) {
      return res.json({
        error: "Email is Required",
      });
    }

    if (!subject) {
      return res.json({
        error: "Submit is Required",
      });
    }

    if (!message) {
      return res.json({
        error: "Message is Required",
      });
    }

    const emailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptiton = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: message,
    };

    emailTransport.sendMail(mailOptiton, (error, info) => {
      if (error) {
        return res.json({ error: error.message });
      } else {
        console.log(`Email send: ${info.response}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return res.json({});
};

//Sign out Endpoint

const signout = (req, res) => {
  return res.clearCookie("token").json({ message: "You are now signed out" });
};

module.exports = {
  test,
  register,
  login,
  profile,
  email,
  signout,
};
