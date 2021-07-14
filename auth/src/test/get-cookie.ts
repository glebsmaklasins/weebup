import request from "supertest";
import { app } from "../app";

export const getCookie = async () => {
  const email = "test@email.com";
  const password = "qwerty";

  const res = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);
  const cookie = res.get("Set-Cookie");

  return cookie;
};
