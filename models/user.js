const Joi = require("joi");
const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/;

const userSchema = Schema({
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      match: passwordRegexp
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL:{
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, { versionKey: false, timestamps: true });

const registerJoiSchema = Joi.object({    
     email: Joi.string().pattern(emailRegexp).required(),
     password: Joi.string().min(6).pattern(passwordRegexp).required(),
     subscription: Joi.string().valid("starter", "pro", "business"),
     token: Joi.string(),
    });

const updateSubscriptionJoiSchema = Joi.object({ 
  subscription: Joi.string().valid("starter", "pro", "business").required(),
    });

const verifyMailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const User = model("user", userSchema);

module.exports = {
    User,
    schemas: {
      register: registerJoiSchema,
      updateSubscription: updateSubscriptionJoiSchema,
      verify: verifyMailSchema,
    }
};