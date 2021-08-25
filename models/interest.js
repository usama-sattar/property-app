const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interestSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, ref:'Users'
    },
    property:{
        type: Schema.Types.ObjectId, ref:'Property'
    },
    interested:{
        type: Boolean
    },
    },{
        timestamps: true
    })
  
const Interest = mongoose.model('Interest', interestSchema)
module.exports = Interest