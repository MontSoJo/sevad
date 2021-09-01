const { authenticated } = require("../../auth/auth.middlewares");
const { catchErrors } = require("../../common/errors");
const Proceedings = require("./proceedings.model");

const getProceedings = catchErrors(async (req, res) => {
  let postcodes = req.query.postcode;
  if (!req.query.postcode) {
    postcodes = req.valuer.postcodes;
  }
  const proceedings = await Proceedings.find({ state: 'Pendent', 'address.postcode': { $in: postcodes } })
    .sort('request_date')
    .lean()
    .exec();
  res.status(200).send(proceedings);
});

const getAllPostcodes = catchErrors(async (req, res) => {
  const allPostcodes = await Proceedings.find()
    .distinct("address.postcode")
    .lean()
    .exec();
  res.status(200).send(allPostcodes);
});

const addRoutesTo = (app) => {
  app.get("/proceedings", authenticated, getProceedings);
  app.get("/postcodes", authenticated, getAllPostcodes);
};

module.exports = {
  addRoutesTo,
};
