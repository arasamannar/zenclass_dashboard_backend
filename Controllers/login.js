const jwt = require("jsonwebtoken");
const Student = require("../Model/studentModel");
const Mentor = require("../Model/mentorModel"); // require the Mentor model
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");

const login = async (req, res) => {
  try {
    //getting email and password from student
    const { email, password } = req.body;

    // search and find the document of the student or mentor with email
    let user = await Student.findOne({ email });
    let userType = 'student';

    // if student not found, check the mentor collection
    if (!user) {
      user = await Mentor.findOne({ email });
      userType = 'mentor';
    }

    // if user not found in both collections, send error
    if (!user) {
      return res
        .status(401)
        .json({ message: "invalid username/Please Sign-up" });
    }

    // if user not verified send error
    if (!user.verified) {
      return res
        .status(401)
        .json({ message: "Account not verfied, kindly check your Email" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    // if user password does not match send error
    if (!passwordCheck) {
      return res.status(401).json({ message: "password incorrect" });
    }

    // generate JWT token
    const userToken = {
      name: user.name,
      id: user._id,
      type: userType, // include the user type in the token
    };

    const token = jwt.sign(userToken, SECRET, { expiresIn: 60 * 60 });

    //if everything is ok send response
    res.status(200).send({ token, user });

    //
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on sign up please try again" });
  }
};

module.exports = {
  login,
};
