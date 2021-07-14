import request from "supertest";
import { app } from "../../app";

describe("signoutRoute", () => {
  it("should clear the cookie when signed out ", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@yo.com",
        password: "qwerty",
      })
      .expect(201);

    const res = await request(app).post("/api/users/signout").expect(200);
    expect(res.get("Set-Cookie")[0]).toEqual(
      "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
