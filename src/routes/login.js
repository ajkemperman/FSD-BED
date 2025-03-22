import { Router } from "express";
import jwt from "jsonwebtoken";
import getLoginUser from "../services/login/getLoginUser.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  const user = await getLoginUser(username, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const tokenUser = jwt.sign({ userId: user.id, role: user.role }, secretKey);

  res.status(200).json({ message: "Successfully logged in!", tokenUser });
});

export default router;
