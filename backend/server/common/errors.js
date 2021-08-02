class ApiError extends Error {
  constructor(code, message) {
    super();
    this.name = "ApiError";
    this.code = code;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  if(err.name === "ApiError") {
    const { code, message } =err;
    return res.status(code).send({ error: message});    
  }
  res.status(500).send({ error: `Internal Server error ${err}`});
}

const errMalformed = (msg) => {
  throw new ApiError(400, msg);
}
const errUnauthorized = (msg) => {
  throw new ApiError(404, msg);
};

const catchErrors = (route) => async (req, res, next, ...args) => {
  try {
    route(req, res, next, ...args);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  ApiError,
  errorHandler,
  catchErrors,
  errMalformed,
  errUnauthorized,
}