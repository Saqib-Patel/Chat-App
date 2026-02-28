const User = require("../models/userModel");

const seedGuestUser = async () => {
    try {
        const guestEmail = "guest@example.com";
        const existingGuest = await User.findOne({ email: guestEmail });

        if (!existingGuest) {
            await User.create({
                name: "Guest User",
                email: guestEmail,
                password: "123456",
                pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            });
            console.log("Guest user seeded successfully ✓".green.bold);
        } else {
            console.log("Guest user already exists ✓".green);
        }
    } catch (error) {
        console.error("Error seeding guest user:".red, error.message);
    }
};

module.exports = { seedGuestUser };
