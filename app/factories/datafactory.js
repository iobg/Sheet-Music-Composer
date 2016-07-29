"use strict";
app.factory("DataFactory", function(FirebaseCreds, $q, $http){
	let pushNewSong = function(songArray){
		return $q(function(resolve,reject){
			$http.post(`${FirebaseCreds.databaseURL}/songs.json`, songArray).
			success(function(result){
				console.log(result);
			}).error(function(error){
				console.log(error);
			})
		});
	}


	let getSong = function(songId){
		return $q(function(resolve,reject){
			$http.get(`${FirebaseCreds.databaseURL}/songs/${songId}.json`).
			success(function(result){
				console.log(result);
				resolve(result);
			}).error(function(error){
				console.log(error);
			})
		});
	}
	return {pushNewSong, getSong};
});