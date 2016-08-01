app.controller("songListCtrl", function($scope,DataFactory,$route){
	$scope.allSongs;

	DataFactory.getSongList().
	then(function(songList){
		$scope.allSongs=songList;
		console.log($scope.allSongs);
	});

	$scope.newSong = function(){
		let thisObject ={};
		thisObject.name= $scope.songName;
		DataFactory.pushNewSong(thisObject).
		then(function(result){
			$route.reload();
		});
	};	
});