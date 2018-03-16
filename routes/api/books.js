const router = require("express").Router();
const booksController = require("../../controllers/booksController");


// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:itemId")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

  router.route('/toTracked')
  .post(booksController.tracked);
module.exports = router;