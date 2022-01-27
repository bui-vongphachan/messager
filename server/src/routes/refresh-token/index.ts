import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { FacebookProfileDoc, FacebookProfileModel } from "../../models";

dotenv.config();

const router = Router();

router.get("/v1/auth/refresh-token", async (req: Request, res: Response) => {
  try {
    const token = req.query.refresh_token as string;

    let profile = jwt.decode(token, { json: true }) as FacebookProfileDoc;

    if (!profile) throw new Error("You need to login CCC again");

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, result) => {
      if (err) throw new Error("You need to login BBB again");
    });

    profile = await FacebookProfileModel.findOne({
      _id: profile._id,
    }).lean();

    const access_token = jwt.sign(profile, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refresh_token = jwt.sign(profile, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return res.json({ access_token, refresh_token });
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

export { router };
