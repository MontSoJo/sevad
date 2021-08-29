const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
  visit_date: { type: Date, required: true, },
  /*
  valuer_ObjectId: { type: mongoose.SchemaTypes.ObjectId, ref: "valuer" },
  proceeding_ObjectId: { type: mongoose.SchemaTypes.ObjectId, ref: "proceeding" },
  */
  valuer_id: { type: String, ref: "valuer" },
  proceeding_id: { type: String, ref: "proceeding" },
  valued: {
    type: String,
    enum: ["Pendent", "Sí", "No"],
    required: true,
    default: 'Pendent',
  }
});

visitSchema.index({ visit_date: 1 });

const Visits = mongoose.model('visit', visitSchema);

module.exports = Visits;
