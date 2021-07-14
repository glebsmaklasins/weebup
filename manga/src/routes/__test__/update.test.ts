import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { getCookie } from "../../test/get-cookie";

describe("updateManga", () => {
  it("should return 404 if provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/manga/${id}`)
      .set("Cookie", getCookie())
      .send({ title: "helloworld", price: 2021 })
      .expect(404);
  });
  it("should return 401 if user not auth", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/manga/${id}`)
      .send({ title: "helloworld", price: 2021 })
      .expect(401);
  });
  it("should return 401 if user does not own ticket", async () => {
    const res = await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ title: "helloworld", price: 2021 })
      .expect(201);
    await request(app)
      .put(`/api/manga/${res.body.id}`)
      .set("Cookie", getCookie())
      .send({ title: "helloworldasda", price: 2021 })
      .expect(401);
  });
  it("should return 400 if provided invalid title and price", async () => {
    const cookie = getCookie();
    const res = await request(app)
      .post("/api/manga")
      .set("Cookie", cookie)
      .send({ title: "helloworld", price: 2021 })
      .expect(201);
    await request(app)
      .put(`/api/manga/${res.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "", price: 2021 })
      .expect(400);
    await request(app)
      .put(`/api/manga/${res.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "helloo", price: -234 })
      .expect(400);
  });
  it("should return updated manga with the valid inputs", async () => {
    const cookie = getCookie();
    const res = await request(app)
      .post("/api/manga")
      .set("Cookie", cookie)
      .send({ title: "helloworld", price: 2021 })
      .expect(201);
    const manga = await request(app)
      .put(`/api/manga/${res.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "yoyoyo", price: 12 })
      .expect(200);
    expect(manga.body.title).toEqual("yoyoyo");
  });
});
