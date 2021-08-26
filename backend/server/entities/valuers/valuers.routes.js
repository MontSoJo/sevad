const { catchErrors, errMalformed, errUnauthorized } = require("../../common/errors");
const auth = require('../../auth/auth.service');
const Valuer = require('./valuers.model');

const register = catchErrors(async (req, res) => {
  const { valuer_id, password, name, postcodes } =  req.body;
  if (!valuer_id) {
    errMalformed('Falta usuari');
  }
  const existingValuer = await Valuer.findOne({ valuer_id }).lean().exec();
  if (existingValuer) {
    errMalformed('Usuari existent');
  }
  if (!password) {
    errMalformed('Falta contrasenya');
  }
  const hashedPassword = await auth.hashPassword(password);
  //name and postcodes unimplemented
  const valuer = await Valuer.create({ valuer_id, password: hashedPassword, name, postcodes });
  res.status(201).send(valuer);
});

const login = catchErrors(async (req, res) => {
  const { valuer_id, password } =  req.body;
  if (!valuer_id) {
    errMalformed('Falta usuari');
  }
  const valuer = await Valuer.findOne({ valuer_id }).select('+password').lean().exec();
  if (!valuer) {
    errUnauthorized('Combinació usuari/contrasenya errònia');
  }
  if (!password) {
    errMalformed('Falta contrasenya');
  }
  const passwordMatches = await auth.comparePasswords(password, valuer.password);
  if (!passwordMatches) {
    errUnauthorized('Combinació usuari/contrasenya errònia');
  }
  const token = auth.createToken(valuer.valuer_id);
  res.status(201).send(token);
});

const addRoutesTo = (app) => { 
  app.post('/register', register);
  app.post('/login', login);
}

module.exports = {
  addRoutesTo,
}