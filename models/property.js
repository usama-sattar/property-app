const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertySchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId, ref:'Users'
    },
    title: {
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    price:{
        type: Number
    },
    },{
        timestamps: true
    })
  
const Property = mongoose.model('Property', propertySchema)
module.exports = Property