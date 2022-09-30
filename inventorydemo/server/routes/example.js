const Router = require('express');
const exampleController = require('../controllers/exampleController');

const router = Router();



router.use((req, res, next) => {
  console.log(`server/routes/example.js: received request ${req.method} ${req.url}`);
  next();
});

router.get('/', (req, res, next) => {
    console.log(`server/routes/example.js.router.get('/'): received request ${req.method} ${req.url}`);
    next();
  },
  exampleController.getAllExamples,
  (req, res) => {
    res.status(200).json(res.locals.examples);
  }
);

router.put('/', (req, res, next) => {
    console.log(`server/routes/example.js.router.put('/'): received request ${req.method} ${req.url}`);
    next();
  },
  exampleController.createExample,
  (req, res) => {
    res.status(200).json(res.locals.newExample);
  }
);


// api router 404 handler
router.use((req, res) => {
  console.log(`server/routes/example.js: handler not found for request ${req.method} ${req.url}`);
  res
    .status(404)
    .json({
      message: `API handler for ${req.method} ${req.url} not found`,
    });
});

module.exports = router;
