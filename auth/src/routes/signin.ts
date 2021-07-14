import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@weebup-gm/common";
import { User } from "../models/user";
import { Password } from "../helpers/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      throw new BadRequestError("Failed to log in");
    }
    const passwordsMatch = await Password.compare(
      userExists.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Failed to log in");
    }
    const jwtToken = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: jwtToken,
    };

    res.send(userExists);
  }
);

export { router as signinRouter };
