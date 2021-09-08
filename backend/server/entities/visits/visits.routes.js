const { authenticated } = require("../../auth/auth.middlewares");
const { catchErrors } = require("../../common/errors");
const mongoose = require("mongoose");
const Visit = require("./visits.model");
const Proceeding = require("../proceedings/proceedings.model");

const addVisit = catchErrors(async (req, res) => {
  const visit = { ...req.body, valuer_id: req.valuer.valuer_id };
  const newVisit = await Visit.create(visit);
  const updateProceeding = await Proceeding.findOneAndUpdate(
    { proceeding_id: visit.proceeding_id },
    { state: "Citat" }
  );
  res.status(201).send(newVisit);
});

const getVisitsOnDate = catchErrors(async (req, res) => {
  let visitsOnDate = req.params.date;
  if (!visitsOnDate) {
    visitsOnDate = new Date().toISOString().slice(0, 10);
  }
  const visits = await Visit.find({
    visit_date: {
      $gte: new Date(`${visitsOnDate}T00:00:00.000Z`),
      $lte: new Date(`${visitsOnDate}T23:59:59.999Z`)
    },
  })
    .sort("visit_date")
    .lean()
    .exec();
  res.status(200).send(visits);
});

const getVisitsOfWeek = catchErrors(async (req, res) => {});

const addRoutesTo = (app) => {
  app.post("/visits", authenticated, addVisit);
  app.get("/visits/:date", authenticated, getVisitsOnDate);
};

module.exports = {
  addRoutesTo,
};
