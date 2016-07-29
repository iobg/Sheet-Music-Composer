"use strict";
var app= angular.module('app', ['ngRoute']);


app.config(function($routeProvider, FirebaseCreds){
	let authConfig={
		apiKey: FirebaseCreds.apiKey,
    	authDomain: FirebaseCreds.authDomain,
    	databaseURL: FirebaseCreds.databaseURL,
    	storageBucket: FirebaseCreds.storageBucket
	}
	firebase.initializeApp(authConfig);

	$routeProvider
	.when('/composer',{
		templateUrl: 'partials/composer.html',
		controller: 'composerCtrl'
	}).otherwise('/composer');
})

