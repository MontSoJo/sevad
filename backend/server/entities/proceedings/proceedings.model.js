const mongoose = require('mongoose');

const proceedingSchema = mongoose.Schema({
  proceeding_id: {
    type: String,
    unique: true,
    required: true,
    minLength: 9,
    maxLength: 9
  },
  name: {
    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true }
  },
  phone_numbers: [{ type: String }],
  address: {
    street: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true, minlength: 5, maxlength: 5 }    
  },
  //GEOJSON (https://mongoosejs.com/docs/geojson.html) 
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  request_date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ["Primera valoració", "Revisió de grau", "Revisió provisional", "Revisió d’ofici", "Reclamació"],
    required: true
  },
  status: { 
    type: String,
    enum: ["Pendent", "Citat", ], 
    required: true,
    default: 'Pendent'
  },
});

//proceedingSchema.index({ });

const Proceedings = mongoose.model('proceeding', proceedingSchema);

module.exports = Proceedings;
