const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  // app.get("/auth/wechat", passport.authenticate("wechat", scope));

  // app.get("/auth/wechat/callback", passport.authenticate("wechat"));
};
