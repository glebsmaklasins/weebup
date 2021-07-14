import express, { Request, Response } from "express";
import { Manga } from "../models/manga";
const router = express.Router();
router.get("/api/manga", async (req: Request, res: Response) => {
  const manga = await Manga.find({});
  res.send(manga);
});

export { router as indexMangaRouter };
