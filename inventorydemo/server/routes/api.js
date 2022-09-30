const Router = require('express');
const example = require('./example');

const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/api.js: received request ${req.method} ${req.url}`);
  next();
});

router.get('/', (req, res) => {
  console.log(`server/routes/api.js.router.get('/'): received request ${req.method} ${req.url}`);
  res.status(200).json({message: 'api router online'});
});

router.use('/example', example);

router.use((req, res) => {
  console.log(`server/routes/api.js: handler not found for request ${req.method} ${req.url}`);
  res
    .status(404)
    .json({
      message: `API handler for ${req.method} ${req.url} not found`,
    });
});

module.exports = router;
