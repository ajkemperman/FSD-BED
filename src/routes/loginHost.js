import { Router } from "express";
import jwt from "jsonwebtoken";
import getLoginHost from "../services/login/getLoginHost.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  const host = await getLoginHost(username, password);

  if (!host) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const tokenHost = jwt.sign({ hostId: host.id }, secretKey);

  res.status(200).json({ message: "Successfully logged in!", tokenHost });
});

export default router;
