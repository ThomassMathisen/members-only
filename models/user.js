const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
})

UserSchema.virtual('url').get(function(){
  return `/catalog/user/${this._id}`
})

UserSchema.pre('save', function(){
  const user = this;

  if (!user.isModified('password')){
    return next()
  }

  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
        return next(err)
    }

    user.password = hash
    next();
  })
})

module.exports = mongoose.model('User', UserSchema)