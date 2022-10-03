const Inventory = require('../models/inventoryModel');
const { createErr } = require('../utils/utils');

const inventoryController = {};

// fetches all inventory from the db
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

// creates a new entry in the db
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

//changes a single field in the db only works for incrementing and decrementing
inventoryController.changeSingleField = async (req, res, next) => {
  const required = ['id', 'field', 'value'];
  const { id, field, value } = req.body;
  console.log('type of id', typeof id);
  console.log('type of field', typeof field);
  console.log('type of value', typeof value);

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'changeSingleField',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }

  if (
    typeof id !== 'string' ||
    typeof field !== 'string' ||
    typeof value !== 'number'
  ) {
    return next(
      createErr({
        method: 'changeSingleField',
        type: 'data validation error',
        err: 'request body contained invalid data',
      })
    );
  }

  try {
    const updateObj = {}
    updateObj.$inc = {};
    updateObj.$inc[field] = value;

    const dbRes = await Inventory.updateOne(
      { _id: id },
      updateObj);
    res.locals.updatedInventory = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'changeSingleField',
        type: 'db insert error',
        err,
      })
    );
  }

  return next();
};

//gets a single entry from the db
inventoryController.getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dbRes = await Inventory.find({ _id: id});
    console.log(dbRes);
    res.locals.inventory = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'getOne',
        type: 'db query error',
        err,
      })
    );
  }
  return next();
};


module.exports = inventoryController;
