import jwt from "jsonwebtoken";
import { users } from "../models/User.js";

export const login = (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user) return res.status(401).send("Invalid user");

  const token = jwt.sign(user, "SECRET");
  res.json({ token, role: user.role });
};
