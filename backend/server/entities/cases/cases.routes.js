const { authenticated } = require('../../auth/auth.middlewares');
const { catchErrors } = require("../../common/errors");
const Cases = require('./cases.model');

const getAllCases = catchErrors(async (req, res) => {
  res.status(200).send({ msg: "Muy guay", valuer: req.valuer });
});

const addRoutesTo = (app) => {
  app.post("/cases", authenticated, getAllCases);
}

module.exports = {
  addRoutesTo,
}