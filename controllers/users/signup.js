const CreateError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const {v4}=require("uuid");

const { User, schemas } = require("../../models/user");
const {sendMail} = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new CreateError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);   
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();

    await User.create({
      email,
      avatarURL,
      password: hashPassword,
      subscription,
      verificationToken,
    });

    const mail = {
      to: email,      
      subject: "Подтверждение email",
      html: `<a target="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Нажмите, чтобы подтвердить Ваш email</a>`,
    };

    await sendMail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
