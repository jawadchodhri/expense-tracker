import bcrypt from "bcryptjs";

import User from "../models/User.js";

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