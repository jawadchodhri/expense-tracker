import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectRoute(
  request,
  response,
  next,
) {
  try {
    const token =
      request.cookies.expense_tracker_auth;

    if (!token) {
      return response.status(401).json({
        message: "You are not logged in.",
      });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    const user = await User.findById(
      decodedToken.userId,
    );

    if (!user) {
      return response.status(401).json({
        message: "User no longer exists.",
      });
    }

    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json({
      message:
        "Your session is invalid or has expired.",
    });
  }
}