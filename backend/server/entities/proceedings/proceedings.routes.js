const { authenticated } = require('../../auth/auth.middlewares');
const { catchErrors } = require("../../common/errors");
const Proceedings = require('./proceedings.model');

const getAllProceedings = catchErrors(async (req, res) => {
  const AllProceedings = await Proceedings.find().lean().exec();
  res.status(200).send(AllProceedings);
});

const addRoutesTo = (app) => {
  app.post("/proceedings", authenticated, getAllProceedings);
}

module.exports = {
  addRoutesTo,
}