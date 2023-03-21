const User = require('../models/user')

const createOrUpdateUser = async (req, res) => {
  const {name, picture, email} = req.user;

  const user = await User.findOneAndUpdate(
    {email},
    {name, picture},
    {new: true},
  )

  if(user){
    // console.log("User Updated: ", user)
    res.json(user)
  } else {
    const newUser = await new User({
        email,
        name: email.split('@')[0],
        picture,
    }).save();
    // console.log("User Created: ", newUser)
    res.json(newUser)
  }
};

const currentUser = async (req, res) => {
  await User.findOne({email: req.user.email}).exec((err, user)=>{
    if(err){
      throw new Error(err)
    }
    res.json(user)
  })
}

module.exports = {createOrUpdateUser, currentUser}