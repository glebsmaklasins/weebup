import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/get-cookie";
const createManga = () => {
  return request(app)
    .post("/api/manga")
    .set("Cookie", getCookie())
    .send({ title: "asdadsada", price: 124 })
    .expect(201);
};

describe("index for Manga", () => {
  it("should return the list of tickets", async () => {
    await createManga();
    await createManga();
    await createManga();
    const res = await request(app).get("/api/manga").send().expect(200);
    expect(res.body.length).toEqual(3);
  });
});
