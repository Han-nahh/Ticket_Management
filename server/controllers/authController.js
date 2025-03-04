const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");

exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, role } = req.body;
        
        let user = await User.findOne({ email });
        console.log(user)
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentialss" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({ token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
