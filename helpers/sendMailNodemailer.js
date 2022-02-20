const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "o.petrakivska@meta.ua",
    pass: META_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) =>{
    try{
        const mail={...data, from: "o.petrakivska@meta.ua"};
        await transporter.sendMail(mail);
        return true;
    } catch (error){
        throw new Error(error);
    }
};

module.exports = sendMail;