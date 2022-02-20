const CreateError = require("http-errors");
const { User } = require("../../models/user");

const verificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw CreateError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

res.json({
    status: "success",
    code: 200,
    message: 'Verification successful',
});
  } catch (error) {
    next(error);
  }
};

module.exports = verificationToken;
