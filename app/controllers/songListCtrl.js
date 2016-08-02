"use strict";
app.controller("songListCtrl", function($scope,DataFactory,$route, $location){
	let currentUser=null;
 firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser=user.uid;
      DataFactory.getSongList(currentUser).
		then(function(songList){
		$scope.allSongs=songList;
		
	});

    } else {
      	$location.path('/login');
      	$scope.$apply();
    }
  });
	
	$scope.newSong = function(){
		let songObject ={};
		songObject.name= $scope.songName;
		songObject.uid=currentUser;
		DataFactory.pushNewSong(songObject).
		then(function(){
			Materialize.toast('New Song Created!', 2000);
			$route.reload();
		});
	};	
	$scope.deleteSong = function(songId){
		DataFactory.deleteSongNotes(songId).then(function(){
			Materialize.toast('Song Deleted!', 2000);
			$route.reload();
		});
	};
});


