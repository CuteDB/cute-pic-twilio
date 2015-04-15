'use strict';

var App = angular.module('App', ['ngRoute','ui.bootstrap']);


App.config(function($routeProvider) {
	$routeProvider.when('', {
		controller : 'MainCtrl',
		templateUrl: './index.html',
	});
});

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {
	$scope.alerts = [];

	$scope.submit = function() {
		$scope.alerts = [];

		if(validateURL($scope.picURL)){
			console.log("Success");
			$scope.alerts.push({ type: 'success', msg: 'Success! Picture added.' });
		} else {
			$scope.alerts.push({ type: 'danger', msg: 'URL does not contain an image. Please try again.' });
		}
		
		$scope.picURL = "";
	}
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});

function validateURL(url) {
	return (url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null && url.indexOf('?') == -1);
}

