const User = require('../models/user');
const { generateToken } = require('../config/jwtToken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, profilePhoto } = req.body;

        if (!name || !email || !password) {
            res.status(500).send({ success: false, message: "Please input all the fields." });
            return;
        }

        const userExists = await User.findOne({ email }, { _id: 1 });
        if (userExists) {
            res.status(500).send({ success: false, message: "User already exists. Please Login or Forgot Password." });
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

        if (!email || !password) {
            return res.status(500).send({ success: false, message: "Please enter email or password." });

        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(500).send({ success: false, message: "User not found. Please SignUp." });
            
        }

        if (user && (await user.matchPassword(password))) {
            user = JSON.parse(JSON.stringify(user));
            user.token = generateToken(user._id);
            return res.status(201).send({ success: true, user });
        } else {
            return res.status(500).send({ success: false, message: "Invalid Password." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(500).send({ success: false, message: "Please enter email." });
            
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(500).send({ success: false, message: "User not found. Please SignUp." });
           
        }

        return res.status(200).send({ success: true, message: "Password reset email has been sent to you. Please check your email. (Spam too)" });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}