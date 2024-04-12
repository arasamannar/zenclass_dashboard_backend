const mongoose = require("mongoose");

// defining a schema for mentors
const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add first name"],
  },
  lName: {
    type: String,
    required: [true, "please add last name"],
  },
  // Consider adding a field for mentor expertise
  expertise: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "please add the email address"],
    unique: [true, "email already taken"],
  },
  password: {
    type: String,
    required: [true, "please add password"],
  },
  resetToken: {
    type: String,
  },
  qualification: {
    type: String,
  },
  experience: {
    type: String,
  },
 
  // adding fields relevant to mentors, like:
  // - availability for mentoring
  // - number of students mentored
  // - ratings from mentees
  
  isMentor: {
    type: Boolean,
    default: true, // Set to true by default for mentors
  },
  leave: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    },
  ],
  portfolio: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
    },
  ],
  // ... other student related fields can be kept if relevant to mentors (capstone, webcode, query, mock, task)
});

// create a model for mentors
module.exports = mongoose.model("Mentor", mentorSchema, "mentors");
