const {User, schemas} = require("../../models/user");
const CreateError = require("http-errors");

const updateSubscription = async (req, res, next) => {
    try {
      const { error } = schemas.updateSubscription.validate(req.body);
      if (error) {
        throw new CreateError(400, {
            message: `Missing field subscription: ${error.message}`,
          });
      }
      const { _id } = req.user;
      const { subscription } = req.body;

if(!req.body){
    throw new CreateError(400, {
        message: `Missing field subscription: ${error.message}`,
      });
}
      const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
      if (!result) {
        throw new CreateError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

module.exports = updateSubscription;