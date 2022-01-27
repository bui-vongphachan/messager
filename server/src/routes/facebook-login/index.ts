import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Profile } from "passport-facebook";
import { FacebookProfileModel } from "../../models";

dotenv.config();

const router = Router();

router.get(
  "/v1/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/v1/facebook/failed",
    successRedirect: "/api/v1/facebook/success",
    scope: [
      "email",
      "user_gender",
      "user_photos",
      "user_hometown",
      "user_age_range",
      "user_birthday",
      "user_friends",
      "user_likes",
    ],
  })
);

router.get("/v1/facebook/success", async (req: Request, res: Response) => {
  const user = req.user as Profile;
  const existing_user = await FacebookProfileModel.findOne({
    id: user.id,
  }).lean();

  const access_token = jwt.sign(existing_user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refresh_token = jwt.sign(
    existing_user,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );

  return res.redirect(
    `${process.env.FRONTEND_URL}/auth/callback/success?` +
      `access_token=${access_token}` +
      `&refresh_token=${refresh_token}` +
      `&user_id=${existing_user._id}` +
      `&user_name=${existing_user.name}` +
      `&user_picture=${existing_user.picture}` +
      `&user_email=${existing_user.email}` +
      `error_code`
  );
});

router.get("/v1/facebook/failed", (req: Request, res: Response) => {
  const error = req.query.error;
  console.log(req.query);
  return res.send("ບໍ່ສາມາດເຂົ້າສູ່ລະບົບໄດ້");
});

export { router as authFacebook };
