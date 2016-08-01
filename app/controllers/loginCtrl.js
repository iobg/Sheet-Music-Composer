"use strict";
app.controller("loginCtrl", function($scope, AuthFactory, $location){
	

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     	$location.path('/songList');
		$scope.$apply();

    } else {
      console.log("User not logged in");
    }
  });



	$scope.loginWithGoogle = function(){
		AuthFactory.authWithProvider().
		then(function(){
			$location.path('/songList');
			$scope.$apply();
		});
	};

	$scope.registerAcct = function(){
		AuthFactory.createAccount($scope.email,$scope.password);
	}

	$scope.loginWithAcct = function(){
		AuthFactory.signIn($scope.email,$scope.password);
	}
});