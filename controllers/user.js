import { User } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

export const handleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log("SIGNUP ERROR", error);
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ msg: "Invalid user" });
    const token = setUser(user);
    res.cookie("uid", token, {
      httpOnly: false,
      secure: false,
    });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log("LOGIN ERROR", error);
  }
};
