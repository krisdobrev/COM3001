const passport = require("passport");
const Authentication = require("../controllers/authentication");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = (app) => {
  // Google login
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  // Google login callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );
  // Regular Login
  app.get("/api", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });

  app.post(
    "/api/signin",
    passport.authenticate("local", { session: false }),
    Authentication.signin
  );
  // Regular signup
  app.post("/api/signup", Authentication.signup);

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
