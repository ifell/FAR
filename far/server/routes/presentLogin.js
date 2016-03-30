'use strict';

var express = require('express');
var router = express.Router();

var PresentLogged = require('../../src/usecases/PresentLogged');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Faculty Activity Report Generator',
    notifications: req.flash('message'),
    present: PresentLogged.isLoggedIn(req)
  });
});

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'Faculty Activity Report Generator',
    notifications: req.flash('message'),
    present: PresentLogged.isLoggedIn(req)
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
      title: 'Faculty Activity Report Generator',
      notifications: req.flash('message'),
      present: PresentLogged.isLoggedIn(req),
      message: req.flash('error')
    }
  )
});

router.get('/register', function (req, res, next) {
  res.render('register', {
      notifications: req.flash('message'),
      title: 'Faculty Activity Report Generator',
      present: PresentLogged.isLoggedIn(req),
      message: req.flash('error')
    }
  );
});

router.get('/logout', function (req, res) {
  res.render('logout', {
      notifications: req.flash('message'),
      title: 'Faculty Activity Report Generator',
      present: PresentLogged.isLoggedIn(req),
      message: req.flash('error')
    }
  );
});

module.exports = router;