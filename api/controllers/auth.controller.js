import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newuser = new User({ username, email, password: hashedPassword });
    try {
        await newuser.save();
        res.status(201).json({ message: "User created successfully", newuser });
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
};