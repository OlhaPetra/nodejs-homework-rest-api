const CreateError = require("http-errors");
const Joi = require("joi");

const {sendMail}  = require("../../helpers");
const { User, schemas } = require("../../models/user");

const verify = async (req, res, next) => {
  try {
    const { error } = schemas.verify.validate(req.body);
    if (error) {
      throw new CreateError(400, "missing required field email");
    };
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(user.verify){
        throw new CreateError(400, "Verification has already been passed");
    };
    const mail = {
        to: email,      
        subject: "Подтверждение email",
        html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Нажмите, чтобы подтвердить Ваш email</a>`,
      };
    sendMail(mail);
    res.json({
        status: "success",
        code: 200,
        message: 'Verification email sent',
    });

  } catch (error) {
    next(error);
  }
};

module.exports = verify;
