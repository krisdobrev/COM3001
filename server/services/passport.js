const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//setup
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.cookieKey,
};

// const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
//   //
//   try {
//     const user = await User.findById(payload.sub);
//     if (!user) {
//       done(null, false);
//     }

//     done(null, false);
//   } catch (err) {
//     return done(err, false);
//   }
// });

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

passport.use(localLogin); //
passport.use(jwtLogin); //

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true, //could add a different path to keys.js and check environment
    },
    async (accessToken, refreshToken, profile, done) => {
      // add catch/error
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log("you exist");
        done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
        }).save();
        done(null, user);
      }
    }
  )
);
