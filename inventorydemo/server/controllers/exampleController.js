const Example = require('../models/exampleModel');
const { createErr } = require('../utils/utils');

const exampleController = {};

// Example Mongoose find
exampleController.getAllExamples = async (req, res, next) => {
  try {
    const dbRes = await Example.find({});
    res.locals.examples = dbRes;
  } catch (err) {
    return next(
      createErr({
        method: 'getAllExamples',
        type: 'db query error',
        err,
      })
    );
  }

  return next();
};

// Example Mongoose create
exampleController.createExample = async (req, res, next) => {
  const required = ['userName', 'exampleTitle', 'exampleText'];
  const { userName, exampleTitle, exampleText } = req.body;

  if (required.some((key) => req.body[key] === undefined)) {
    return next(
      createErr({
        method: 'createExample',
        type: 'data validation error',
        err: 'request body did not include all required fields',
      })
    );
  }

  if (
    typeof userName !== 'string' ||
    typeof exampleTitle !== 'string' ||
    typeof exampleText !== 'string'
  ) {
    return next(
      createErr({
        method: 'createExample',
        type: 'data validation error',
        err: 'request body did contained invalid data',
      })
    );
  }

  try {
    const dbRes = await Example.create({ userName, exampleTitle, exampleText });
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

module.exports = exampleController;
