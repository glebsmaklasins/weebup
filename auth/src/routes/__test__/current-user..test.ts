import request from "supertest";
import { app } from "../../app";
import { getCookie } from "../../test/get-cookie";

describe("currentuserRoute", () => {
  it("should return details of a current user", async () => {
    const cookie = await getCookie();

    const res = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .expect(200);
    expect(res.body.currentUser.email).toEqual("test@email.com");
  });

  it("should return null if not authenticated", async () => {
    const res = await request(app).get("/api/users/currentuser").expect(200);
    expect(res.body.currentUser).toEqual(null);
  });
});
