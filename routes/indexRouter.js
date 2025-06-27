const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();


indexRouter.get("/", indexController.showHomePage);
indexRouter.get("/sign-up", indexController.showSignUp);
indexRouter.post("/sign-up", indexController.SignUpPost);
indexRouter.post("/log-in", indexController.LogInPost);
indexRouter.get("/log-out", indexController.LogOutGet);

indexRouter.get("/join-club", indexController.showJoinClubPage);
indexRouter.post("/join-club", indexController.JoinClubPost);

indexRouter.get("/create-message", indexController.showCreateMessagePage);
indexRouter.post("/create-message", indexController.CreateMessagePost);

module.exports = indexRouter;


