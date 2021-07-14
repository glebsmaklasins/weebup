import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/get-cookie";
import mongoose from "mongoose";

describe("singleMangaRoute", () => {
  it("should return 404 if manga not found ", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/manga/${id}`).send().expect(404);
  });
  it("should return the manga if its found ", async () => {
    const title = "deathnote";
    const price = 123;
    const res = await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({
        title,
        price,
      })
      .expect(201);

    const mangaRes = await request(app)
      .get(`/api/manga/${res.body.id}`)
      .send()
      .expect(200);

    expect(mangaRes.body.title).toEqual(title);
  });
});
