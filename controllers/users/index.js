const signup = require("./signup");
const login = require("./login");
const currentUser = require("./currentUser");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const avatar = require("./avatar");
const verificationToken = require("./verificationToken");
const verify = require("./verify");

module.exports = {
    signup,
    login,
    currentUser,
    logout,
    updateSubscription,
    avatar,
    verificationToken,
    verify,
}