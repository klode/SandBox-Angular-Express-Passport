'use strict';
/*
 * Serve JSON to our AngularJS client
 */
var Users = require('../users');

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.testUsers = function (req, res) {
  res.json(Users.testUsers);
};

exports.books = function (req, res) {
  res.json([
      {title: 'book1', author: 'author1'},
      {title: 'book2', author: 'author2'}
  ]);
};
