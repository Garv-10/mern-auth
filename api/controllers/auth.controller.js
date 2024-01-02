import { error } from "console";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found, Invalid Credentials"));
        const isPasswordCorrect = bcryptjs.compareSync(password, validUser.password);
        if (!isPasswordCorrect) return next(errorHandler(401, "Invalid Credentials"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        res.cookie("access_token", token, {
            httpOnly: true, expires: new Date(Date.now() + 60 * 60 * 1000)
        }).status(200).json({ message: "User signed in successfully", rest });
    } catch (err) {
        next(err);
    }

}