import request from "supertest";
import { app } from "../../app";

describe("signinRoute", () => {
  it("should send 400 if email does not exist", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@yo.com",
        password: "qwerty",
      })
      .expect(400);
  });
  it("should fail when incorrect password supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@yo.com",
        password: "qwerty",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@yo.com",
        password: "qy",
      })
      .expect(400);
  });
  it("should have a cookie if given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@yo.com",
        password: "qwerty",
      })
      .expect(201);

    const res = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@yo.com",
        password: "qwerty",
      })
      .expect(200);
    expect(res.get("Set-Cookie")).toBeDefined();
  });
});
