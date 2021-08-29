const { authenticated } = require('../../auth/auth.middlewares');
const { catchErrors } = require("../../common/errors");
const Proceedings = require('./proceedings.model');

const getAllProceedings = catchErrors(async (req, res) => {
  const allProceedings = await Proceedings.find().lean().exec();
  res.status(200).send(allProceedings);
});

const getPostCodeProceedings = catchErrors(async (req, res) => {
  const postCodeProceedings = await Proceedings.find({ 'address.postcode': req.params.postcode }).lean().exec();
  res.status(200).send(postCodeProceedings);
});

const addRoutesTo = (app) => {
  app.get("/proceedings", authenticated, getAllProceedings);
  app.get("/proceedings/:postcode", authenticated, getPostCodeProceedings);
}

module.exports = {
  addRoutesTo,
}