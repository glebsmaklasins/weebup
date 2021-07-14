import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@weebup-gm/common";
import { Manga } from "../models/manga";

const router = express.Router();

router.put(
  "/api/manga/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const manga = await Manga.findById(req.params.id);

    if (!manga) throw new NotFoundError();
    if (manga.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    manga.set({
      title,
      price,
    });
    await manga.save();
    res.send(manga);
  }
);

export { router as updateMangaRouter };
