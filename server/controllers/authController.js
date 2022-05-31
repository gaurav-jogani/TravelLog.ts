const User = require('../models/user');
const { generateToken } = require('../config/jwtToken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, profilePhoto } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ success: false, message: "Please input all the fields." });
            return;
        }

        const userExists = await User.findOne({ email }, { _id: 1 });
        if (userExists) {
            res.status(400).send({ success: false, message: "User already exists. Please Login or Forgot Password." });
            return;
        }

        let user = await User.create({
            name, email, password, profilePhoto
        });

        if (!user) {
            res.status(500).send({ success: false, message: "SignUp Failed! Please try again after some time." });
            return;
        }
        user = JSON.parse(JSON.stringify(user));
        user.token = generateToken(user._id);
        res.status(201).send({ success: true, user });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            res.status(500).send({ success: false, message: "User not found. Please SignUp." });
            return;
        }

        if (user && (await user.matchPassword(password))) {
            user = JSON.parse(JSON.stringify(user));
            user.token = generateToken(user._id);
            res.status(201).send({ success: true, user });
        } else {
            res.status(500).send({ success: false, message: "Invalid Password." });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}