"use strict";
var app= angular.module('app', ['ngRoute']);


app.config(function($routeProvider){

	$routeProvider
	.when('/composer',{
		templateUrl: 'partials/composer.html',
		controller: 'composerCtrl'
	}).otherwise('/composer');
})

