"use strict";
app.controller("navCtrl",function($scope, AuthFactory){
	$scope.logout = function(){
		AuthFactory.logout();
	};
});