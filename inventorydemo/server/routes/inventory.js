const Router = require('express');
const inventoryController = require('../controllers/inventoryController')

const router = Router();

router.use((req, res, next) => {
  console.log(`server/routes/inventory.js: received request ${req.method} ${req.url}`);
  next();
});

router.get('/all', inventoryController.getAll, (req, res) => {
  console.log(`server/routes/inventory.js.router.get('/all'): received request ${req.method} ${req.url}`);
  res.status(200).json(res.locals.inventory);
});

router.get('/getOne/:id', inventoryController.getOne, (req, res) => {
  console.log(`server/routes/inventory.js.router.get('/getOne'): received request ${req.method} ${req.url}`);
  res.status(200).json(res.locals.inventory);
});

router.post('/create', inventoryController.create, (req, res) => {
  console.log(`server/routes/inventory.js.router.post('/create'): received request ${req.method} ${req.url}`);
  res.status(200).json({message: 'created a new entry'});
})

router.patch('/changeSingleField', inventoryController.changeSingleField, (req, res) => {
  console.log(`server/routes/inventory.js.router.post('/changeSingleField'): received request ${req.method} ${req.url}`);
  res.status(200).json(res.locals.updatedInventory);
})

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
