import request from "supertest";
import { app } from "../../app";

describe("signupRoute", () => {
  it("should return a 201 on suc signup ", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@yo.com", password: "qwerty" })
      .expect(201);
  });
  it("should return a 400 if invalid email  ", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "testyo.com", password: "qwerty" })
      .expect(400);
  });
  it("should return a 400 if invalid  pw ", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@yo.com", password: "1" })
      .expect(400);
  });
  it("should return a 400 send an empy obj", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });
  it("should not allow duplicate emails ", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@yo.com", password: "qwerty" })
      .expect(201);

    return request(app)
      .post("/api/users/signup")
      .send({ email: "test@yo.com", password: "qwerty" })
      .expect(400);
  });
  it("should set a cookie after suc signup", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({ email: "test@yo.com", password: "qwerty" })
      .expect(201);

    expect(res.get("Set-Cookie")).toBeDefined();
  });
});
