import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  DatabaseConnectionError,
  validateRequest,
} from "@weebup-gm/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be provided"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password Must be between 4-20chars"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) throw new BadRequestError("email is in use");
    const user = await User.build({ email, password });
    await user.save();
    //get token
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: jwtToken,
    };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
