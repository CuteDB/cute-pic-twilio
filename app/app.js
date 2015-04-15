'use strict';

var App = angular.module('App', ['ngRoute','ui.bootstrap']);


App.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller : 'MainCtrl',
    templateUrl: 'partials/main.html',
  });
  $routeProvider.when('/add', {
    controller : 'InsertCtrl',
    templateUrl: 'partials/add.html',
  });
  $routeProvider.when('/responses', {
    controller : 'ResponsesCtrl',
    templateUrl: 'partials/responses.html',
  });
  $routeProvider.when('/images', {
    controller : 'ImagesCtrl',
    templateUrl: 'partials/images.html',
  });
  $routeProvider.otherwise({
    redirectTo : '/'
  });
});

App.controller('NavCtrl',function($scope,$rootScope,$log,$http,$routeParams, $location, $route){
  $scope.navHome = function(){
    $location.path('/');
  };
  $scope.navAdd = function(){
    $location.path('/add');
  };
  $scope.navResp = function(){
    $location.path('/responses');
  };
  $scope.navImages = function(){
    $location.path('/images');
  };
});

App.controller('InsertCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route){

  $scope.picURL = "";

  $scope.send = function(){

    //$location.path('/');
  };

  $scope.alerts = [];

  $scope.submit = function() {
    $scope.alerts = [];

    if(validateURL($scope.picURL)){
      var data = {
        picURL : $scope.picURL, 
      };

      $http.post('/rest/add', data)
      .success(function(data, status, headers, config) {
        console.log("Success");
        $scope.alerts.push({ type: 'success', msg: 'Success! Picture added.' });
      });
    } else {
      $scope.alerts.push({ type: 'danger', msg: 'Invalid URL! Please try again.' });
    }
    
    $scope.picURL = "";
  }
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

});

App.controller('ResponsesCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route){

});

App.controller('ImagesCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route){

});

function validateURL(url) {
  return (url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null && url.indexOf('?') == -1);
}
