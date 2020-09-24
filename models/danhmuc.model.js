var express = require('express');
var mongoose = require('mongoose');

// tao bang du lieu
var danhmucSchema = new mongoose.Schema({
  name : String
});

// tao collection
var danhmucDb = mongoose.model('danhmucDb', danhmucSchema, 'danhmuc');

module.exports = danhmucDb;


