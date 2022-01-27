import { Strategy, Profile } from "passport-facebook";
import passport from "passport";
import dotenv from "dotenv";
import { FacebookProfileModel } from "./models";

dotenv.config();

passport.use(
  "facebook",
  new Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://localhost:4000/api/v1/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "photos",
        "email",
        "gender",
        "birthday",
        "education",
        "hometown",
        "friends",
      ],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, info?: any) => void
    ) => {
      try {
        await FacebookProfileModel.findOneAndUpdate(
          { id: profile.id },
          {
            $set: {
              id: profile.id,
              name: profile.displayName,
              picture: profile.photos[0].value,
              email: profile.emails ? profile.emails[0].value : "",
              gender: profile.gender,
              birthday: profile._json.birthday,
              accessToken,
            },
          },
          { new: true, upsert: true }
        );

        return done(null, profile);
      } catch (error) {
        return done(error, profile);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
