const express = require("express");
const Users = require("../models/users");
const Property = require('../models/property')
const Interest = require('../models/interest')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

//register
const register = async (req, res) => {
  const emailCheck = await Users.findOne({ email: req.body.email });
  if (emailCheck) {
    res.status(400).send("email already registered");
  } else {
    //password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //saving user
    const user = new Users({
      email: req.body.email,
      password: hashPassword,
    });
    try {
      const newUser = await user.save();
      res.send({newUser, message: "sucessfully registered"});
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

//login
const login = async (req, res) => {
  const userCheck = await Users.findOne({ email: req.body.email });
  if (!userCheck) {
    res.status(400).send("email or password is wrong");
  } else {
    const passCheck = await bcrypt.compare(
      req.body.password,
      userCheck.password
    );
    if (!passCheck) {
      res.status(400).send("password is wrong");
    } else {
      const token = jwt.sign({ _id: userCheck._id }, process.env.SECRET_KEY);
      res.header("auth-token", token).send({ token, userCheck });
    }
  }
};

const postAd = async (req,res) =>{
  const newAd = new Property({
    owner: req.user._id,
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    price: req.body.price
  });
  try {
    const result = await newAd.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
}

const getAll = async (req, res)=>{
  const result = await Property.find()
  try{
    res.send(result)
  }
  catch(err){
    res.status(400).send(err)
  }
}
const getProperty = async (req,res)=>{
  const result = await Property.find({owner: req.user._id})
  try{
    return res.send(result)
  }
  catch (err) {
    res.status(400).send(err);
  }
}
const postInterest = async(req,res) =>{
  const newInterest = new Interest({
    user: req.user._id,
    property: req.body.property,
    interested: req.body.interested
  });
  try {
    const result = await newInterest.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
} 
const countInterest = async (req,res) =>{
  Interest.countDocuments({user: req.user._id, property: req.params.property}).exec((err, count) => {
    if (err) {
        res.send(err);
        return;
    }
    Interest.find({user: req.user._id, property: req.params.property})
    .then((result)=>res.json({ count: count, result}))
  });
} 

module.exports = { register, login, postAd, getAll, postInterest, countInterest, getProperty};
