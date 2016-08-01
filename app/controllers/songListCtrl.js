app.controller("songListCtrl", function($scope,DataFactory,$route, $location){
	$scope.allSongs;
	let currentUser=null;
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User logged in", user.uid);
      currentUser=user.uid;
      DataFactory.getSongList(currentUser).
		then(function(songList){
		$scope.allSongs=songList;
		console.log($scope.allSongs);
	});

    } else {
      console.log("User not logged in");
      	$location.path('/login');
      	$scope.$apply();
    }
  });
	
	$scope.newSong = function(){
		let songObject ={};
		songObject.name= $scope.songName;
		songObject.uid=currentUser;
		DataFactory.pushNewSong(songObject).
		then(function(result){
			$route.reload();
		});
	};	
});

