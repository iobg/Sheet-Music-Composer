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
	.when('/login',{
		templateUrl: 'partials/splash.html',
		controller: 'loginCtrl'
	}).when('/composer/:songId',{
		templateUrl: 'partials/composer.html',
		controller: 'composerCtrl'
	}).when('/songList',{
		templateUrl: 'partials/songList.html',
		controller: 'songListCtrl'
	}).otherwise('/login');
});

