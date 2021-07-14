import express, { Request, Response } from "express";
import { NotFoundError } from "@weebup-gm/common";
import { body } from "express-validator";
import { Manga } from "../models/manga";

const router = express.Router();
router.get("/api/manga/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const manga = await Manga.findById(id);
  if (!manga) {
    throw new NotFoundError();
  }

  res.send(manga);
});

export { router as showSingleManga };
