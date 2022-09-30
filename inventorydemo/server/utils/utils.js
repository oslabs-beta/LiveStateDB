const {basename} = require('path')

const utils = {
  createErr: (errInfo) => {
    const { method, type, err } = errInfo;
    return {
      log: `${basename(__filename)}.${method} ${type}: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: `Error occurred in apiRouter.${method}. Check server logs for more details.`,
      },
    };
  },
};

module.exports = utils;
