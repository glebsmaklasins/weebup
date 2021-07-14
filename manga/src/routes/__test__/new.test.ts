import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/get-cookie";
import { Manga } from "../../models/manga";

describe("newRoute", () => {
  it("should have a route handler to api/tickets for post requests", async () => {
    const res = await request(app).post("/api/manga").send({});
    expect(res.status).not.toEqual(404);
  });
  it("can only be accessed if user is signed in", async () => {
    const res = await request(app).post("/api/manga").send({});
    expect(res.status).toEqual(401);
  });
  it("if signed in return status 200", async () => {
    const cookie = getCookie();
    const res = await request(app)
      .post("/api/manga")
      .send({})
      .set("Cookie", cookie);
    expect(res.status).not.toEqual(401);
  });
  it("return an error if an invalid title is provided", async () => {
    await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ title: "", price: 12 })
      .expect(400);
    await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ price: 12 })
      .expect(400);
  });
  it("returns an error if invalid price is provided", async () => {
    await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ title: "asdadsada", price: -5 })
      .expect(400);
    await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ title: "asdadsada" })
      .expect(400);
  });

  it("should return a manga with valid inputs", async () => {
    let manga = await Manga.find({});
    expect(manga.length).toEqual(0);
    const res = await request(app)
      .post("/api/manga")
      .set("Cookie", getCookie())
      .send({ title: "asdadsada", price: 124 })
      .expect(201);
    manga = await Manga.find({});
    expect(manga.length).toEqual(1);
  });
});
