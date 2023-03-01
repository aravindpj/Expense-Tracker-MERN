
const passport = require("passport");
const {
  getAllTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/TransactionControll");
const router = require("express").Router();

router.use(passport.authenticate("jwt", { session: false }))

router.post("/", createTransaction);
router.get("/", getAllTransaction);
router.delete("/:id", deleteTransaction);
router.patch("/:id", updateTransaction);

module.exports = router;
