const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }
    },{
        timestamps: true
    })
  
const Users = mongoose.model('Users', userSchema)
module.exports = Users