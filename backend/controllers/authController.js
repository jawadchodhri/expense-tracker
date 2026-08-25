import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

function setAuthCookie(response, userId) {
  const token = generateToken(userId);

  response.cookie(
    "expense_tracker_auth",
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    },
  );
}

export async function registerUser(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Please provide name, email, and password.",
      });
    }

    if (password.length < 6) {
      return response.status(400).json({
        message: "Password must have at least 6 characters.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return response.status(409).json({
        message: "This email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const newUser = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    setAuthCookie(response, newUser._id);

    return response.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(
      "Registration failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Registration failed.",
    });
  }
}

export async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Please provide email and password.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    }).select("+password");

    if (!user) {
      return response.status(401).json({
        message: "Email or password is incorrect.",
      });
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordsMatch) {
      return response.status(401).json({
        message: "Email or password is incorrect.",
      });
    }

    setAuthCookie(response, user._id);

    return response.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Login failed:",
      error.message,
    );

    return response.status(500).json({
      message: "Login failed.",
    });
  }
}

export function logoutUser(request, response) {
  response.clearCookie(
    "expense_tracker_auth",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  );

  return response.status(200).json({
    message: "Logout successful.",
  });
}

export function getCurrentUser(request, response) {
  return response.status(200).json({
    user: {
      id: request.user._id,
      name: request.user.name,
      email: request.user.email,
    },
  });
}