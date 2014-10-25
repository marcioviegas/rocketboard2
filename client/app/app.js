'use strict';

var app = angular.module('rocketBoardApp', ['ngCookies', 'btford.socket-io', 'mgcrea.ngStrap', 'ngResource', 'ui.select', 'ngSanitize', 'ngRoute', 'ui.sortable', 'oauth']);

app.config(function($httpProvider, $routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'app/board/board.html',
      controller: 'BoardController',
      requireLogin: true
    });

  $routeProvider.otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

}).run(function($http, $rootScope, UserLoginService, $location, UserManager) {

  $rootScope.$on('$routeChangeStart', function(event, next) {

    if (next.params.access_token) {
      UserLoginService.login(next.params.access_token);
      $http.defaults.headers.common.Authorization = 'token ' + UserLoginService.getToken();

      UserManager.find().then(function(res) {
        $rootScope.user = res.data;
      });

      $location.url($location.path());
    }

    if (next.requireLogin && !UserLoginService.isLoggedIn()){
      window.location = 'http://github.com/login/oauth/authorize?client_id=c8e53a399aaaf4423852&scope=public_repo';
    }
  });

});
