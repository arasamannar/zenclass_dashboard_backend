const Mentor = require("./mentorModel"); 

const demoMentorData = {
    name: "John Doe",
    lName: "Mentor",
    email: "johndoe@mentor.com",
    password: "demoPassword123",  
    expertise: "Web Development",
};

const seedMentor = async () => {
    try {
        const mentorCount = await Mentor.countDocuments({});
        if (mentorCount > 0) {
            console.log("Mentors already exist in the database. Skipping seeding process.");
            return;
        }

        const newMentor = new Mentor(demoMentorData);
        await newMentor.save();
        console.log("Demo Mentor Seeded Successfully!");
    } catch (error) {
        console.error("Error Seeding Demo Mentor:", error);
    }
};

module.exports = seedMentor;