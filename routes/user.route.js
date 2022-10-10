const { Router } = require("express");
const router = Router();
const { user } = require("../controllers/user.controller");

router.get("/admin/users", user.getUsers); // TODO admin middleware ?
router.get("/user/:id/verify/:token", user.verifyUser);
router.post("/user/login", user.loginUser);
router.post("/user/auth", user.authUser);
router.patch("/user/update", user.updateUser);
router.patch("/user/buy", user.buyProductByUser);

module.exports = router;