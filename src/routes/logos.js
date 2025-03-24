import { Router } from "express";
import updateLogo from "../services/logo/updateLogo.js";
import getLogo from "../services/logo/getLogo.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const logos = await getLogo();
    if (logos.length === 0) {
      res.status(404).json({ message: `Logo not found` });
    } else {
      res.status(200).json(logos);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    const logo = await updateLogo(id, image);

    if (logo) {
      res.status(200).json({
        message: `Logo with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Logo with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});

export default router;
