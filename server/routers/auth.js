const router = require("express").Router();
const cors = require("cors");
const { test, register,login,profile,email,signout } = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
 
router.get("/", test);
router.post("/register", register);
router.post('/login',login);
router.get('/profile',profile)
router.post("/email",email)
router.post('/signout',signout)

module.exports = router;
