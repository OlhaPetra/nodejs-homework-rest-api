const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const avatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, newFileName);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", newFileName);

    await Jimp.read(resultUpload).then((file) => {
        file.resize(250, 250).write(`${resultUpload}`);
      }); 

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = avatar;
