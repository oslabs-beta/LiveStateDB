const Router = require('express');
const db = require('../fakeRedis/fakeRedis')
const eventController = require('../controllers/event')
const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/event.js: received request ${req.method} ${req.url}`);
  next();
});



router.get('/', eventController.connection, (req, res) => {
  console.log(`server/routes/event.js.router.get('/'): received request ${req.method} ${req.url}`);
});


//general handeler if request not found/handled
router.use((req, res) => {
  console.log(`server/routes/api.js: handler not found for request ${req.method} ${req.url}`);
  res
    .status(404)
    .json({
      message: `Inventory handler for ${req.method} ${req.url} not found`,
    });
});

module.exports = router;
