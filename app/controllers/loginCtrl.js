app.controller("loginCtrl", function($scope, AuthFactory, $location){
	

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User logged in", user.uid);
     	$location.path('/songList');
		$scope.$apply();

    } else {
      console.log("User not logged in");
    }
  });



	$scope.loginWithGoogle = function(){
		AuthFactory.authWithProvider().
		then(function(stuff){
			$location.path('/songList');
			$scope.$apply();
		});
	}
});