const currentUser = async (req, res, next) => {
  try {
    res.json({
       email: req.user.email,
       subscription: req.user.subscription,
    })
  } catch (error) {
    next(error);
  }
};

module.exports = currentUser;
