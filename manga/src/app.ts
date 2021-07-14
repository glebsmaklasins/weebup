import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler, NotFoundError, currentUser } from "@weebup-gm/common";
import cookieSession from "cookie-session";
import { createMangaRouter } from "./routes/new";
import { showSingleManga } from "./routes/showsngle";
import { indexMangaRouter } from "./routes";
import { updateMangaRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(createMangaRouter);
app.use(showSingleManga);
app.use(indexMangaRouter);
app.use(updateMangaRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
