import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newuser = new User({ username, email, password: hashedPassword });
    try {
        await newuser.save();
        res.status(201).json({ message: "User created successfully", newuser });
    }
    catch (err) {
        // res.status(409).json({ message: err.message });
        next(err);
        // next(errorHandler(300, "Garv wants to give you this error"))
    }
};