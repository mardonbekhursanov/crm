// Registration
const register = require("./register.controller")

// Auth
const { login, logout, refresh } = require('./login.controller')

// User
const { update_user, profileImageUpdate, deleteUser, getProfile} = require("./user.controller")
module.exports = {
    register,
    login,
    logout, 
    refresh,
    update_user,
    profileImageUpdate,
    deleteUser,
    getProfile
}