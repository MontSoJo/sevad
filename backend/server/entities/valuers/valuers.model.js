const mongoose = require('mongoose');

const valuerSchema = mongoose.Schema({
  
  //valuer és el nom d'usuari pel login (dni, email, primera lletra nom+cognom...), l'esquema variarà depenent de l'opció triada 
  valuer: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, select: false },
  name: {
    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true },
  },
  postcodes: [{ type: String, required: true, trim: true }],
});

//valuerSchema.index({});

const Valuer = mongoose.model("valuer", valuerSchema);

module.exports = Valuer;
