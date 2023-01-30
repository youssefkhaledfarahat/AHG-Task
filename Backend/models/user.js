const mongoose = require('mongoose')
const UserSchema = new  mongoose.Schema({
    password: { type: String, required: true },
    email: {type: String, required: true},
    isAdmin : {type: Boolean,default:false, required: true},
});

User = mongoose.model('User', UserSchema);

module.exports =  mongoose.model('User', UserSchema);