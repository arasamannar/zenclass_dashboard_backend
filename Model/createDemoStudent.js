// createDemoUser.js
const Student = require('./studentModel');
const bcrypt = require('bcrypt');

const createDemoStudent = async () => {
  // Code for creating the demo student
    try {
      const hashedPassword = await bcrypt.hash('Pass@123', 10);
  
      const studentUser = new Student({
        email: 'helloworld@gmail.com',
        password: hashedPassword,
        name: 'Student User',
        lName: 'Demo',
        // Add any other required fields
      });
  
      await studentUser.save();
      console.log('Demo student created successfully');
    } catch (error) {
      console.error('Error creating demo student:', error);
    }
};
module.exports = {
    createDemoStudent,
  };