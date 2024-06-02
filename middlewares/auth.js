import { getUser } from "../service/auth.js";

export const checkAuthentication = (req, res, next) => {
  try {
    const token = req.headers.uid;
    if (!token) return res.json({ msg: "Invalid User" });
    const user = getUser(token);
    if (!user) return res.json({ msg: "Invalid User" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
