import jwt from "jsonwebtoken";

const secretKey = "Prashant$123@";

export const setUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secretKey
  );
};

export const getUser = (token) => {
  return jwt.verify(token, secretKey);
};
