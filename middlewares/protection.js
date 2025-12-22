const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.sendStatus(401);

  try {
    let decoded = req.user = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findOne({where: {id: decoded.id}, raw: true})
    const {password, ...userWithoutPassword} = user
    req.user = userWithoutPassword
    if(user){
        next();
    }
  } catch (error){
    res.sendStatus(401);
  }
};

module.exports = {
    protect
}