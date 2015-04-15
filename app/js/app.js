'use strict';

var App = angular.module('App', ['ngRoute']);


App.config(function($routeProvider) {
  $routeProvider.when('/add', {
    controller : 'MainCtrl',
    templateUrl: './index.html',
  });
});

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

});

