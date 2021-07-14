import express, { Request, Response } from "express";
import { requireAuth, currentUser, validateRequest } from "@weebup-gm/common";
import { body } from "express-validator";
import { Manga } from "../models/manga";

const router = express.Router();

router.post(
  "/api/manga",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const manga = Manga.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await manga.save();
    res.status(201).send(manga);
  }
);

export { router as createMangaRouter };
