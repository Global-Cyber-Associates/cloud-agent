// backend/controllers/usersController.js

import User from "../models/User.js";
import bcrypt from "bcrypt";

// ⭐ CREATE USER (Admin)
export async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.json({ message: "User created", user: newUser });

  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
}



// ⭐ GET ALL USERS (Admin)
export async function getUsers(_req, res) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
}



// ⭐ DELETE USER (Admin)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
}



// ⭐ UPDATE USER ROLE (Admin)
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await User.findByIdAndUpdate(id, { role });

    res.json({ message: "User updated" });

  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
}
