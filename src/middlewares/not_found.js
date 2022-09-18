module.exports = (req, res, next) => {
  const err = new Error("Address Not Found");
  err.status = 404;
  next(err);
};
