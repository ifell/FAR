'use strict';

//class PresentLogged {
//  constructor() {
//    this.loggedOut();
//  }
//
//  loggedIn(user) {
//    this._text = 'Logout ' + user.username;
//    this._route = '/logout';
//
//    this._showSectionsRoute = '/sections';
//    this._showSectionsText = 'Sections';
//  }
//
//  loggedOut() {
//    this._text = 'Login';
//    this._route = '/login';
//
//    this._showSectionsRoute = '/';
//    this._showSectionsText = 'Home';
//  }
//
//  showText() {
//    return this._text;
//  }
//
//  showRoute() {
//    return this._route;
//  }
//
//  showSectionsText() {
//    return this._showSectionsText;
//  }
//
//  showSectionsRoute() {
//    return this._showSectionsRoute;
//  }
//}

function isLoggedIn(req) {
  if (!req.user) {
    return {
      nav: {
        text: 'Login',
        route: '/login'
      },
      sections: {
        text: 'Home',
        route: '/'
      }
    };
  } else {
    return {
      nav: {
        text: 'Logout',
        route: '/logout'
      },
      sections: {
        text: 'Sections',
        route: '/sections/name/year/2016'
      }
    };
  }
}

module.exports = {
  isLoggedIn: isLoggedIn
};