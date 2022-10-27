const Router = require('express');
const inventoryController = require('../controllers/inventoryController')

const router = Router();


router.get('/all', inventoryController.getAll, (req, res) => {
  res.status(200).json(res.locals.inventory);
});

router.get('/getOne/:id', inventoryController.getOne, (req, res) => {
  res.status(200).json(res.locals.inventory);
});

router.post('/create', inventoryController.create, (req, res) => {
  res.status(200).json({message: 'created a new entry'});
})

router.patch('/changeSingleField', inventoryController.changeSingleField, (req, res) => {
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
