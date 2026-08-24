import jwt from "jsonwebtoken";

export function generateToken(userId) {
  const token = jwt.sign(
    {
      userId: userId.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return token;
}