const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    console.log(400, `${id} is not valid id`);
  }
  next();
};

module.exports = isValidId;
