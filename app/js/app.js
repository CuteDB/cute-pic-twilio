'use strict';

var App = angular.module('App', ['ngRoute']);


App.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller : 'MainCtrl',
    templateUrl: './index.html',
  });
});

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route){
  $scope.url = '';

  $scope.send = function(){

    var data = {
      pic_url : $scope.url, 
    };

    $http.post('/rest/add', data)
    .success(function(data, status, headers, config) {
      //$rootScope.guests.push(data);
    });

    //$location.path('/');
  };

});

