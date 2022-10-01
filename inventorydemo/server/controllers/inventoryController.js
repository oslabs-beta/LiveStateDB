const Inventory = require('../models/inventoryModel');
const { createErr } = require('../utils/utils');

const inventoryController = {};

// Example Mongoose find
inventoryController.getAll = async (req, res, next) => {
  try {
    const dbRes = await Inventory.find({});
    res.locals.inventory = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'getAllInventory',
        type: 'db query error',
        err,
      })
    );
  }

  return next();
};

// Example Mongoose create
inventoryController.create = async (req, res, next) => {
  const required = ['item', 'quantity', 'description', 'price'];
  const { item, quantity, description, price } = req.body;

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'createInventoryItem',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }

  if (
    typeof item !== 'string' ||
    typeof quantity !== 'number' ||
    typeof price !== 'number' ||
    typeof description !== 'string'
  ) {
    return next(
      createErr({
        method: 'createInventoryItem',
        type: 'data validation error',
        err: 'request body contained invalid data',
      })
    );
  }

  try {
    const dbRes = await Inventory.create(
      { item: item,
        quantity: quantity,
        price: price,
        description: description, 
      });
    res.locals.newExample = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'createExample',
        type: 'db insert error',
        err,
      })
    );
  }

  return next();
};

module.exports = inventoryController;
