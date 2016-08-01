"use strict";
app.factory("DataFactory", function(FirebaseCreds, $q, $http){
	let pushNewSong = function(song){
		return $q(function(resolve,reject){
			$http.post(`${FirebaseCreds.databaseURL}/songs.json`, song).
			success(function(result){
				resolve(result);
			}).error(function(error){
				reject(error);
			});
		});
	};

	let pushNewNote = function(noteObject){
			console.log(noteObject);
		return $q(function(resolve,reject){
			$http.post(`${FirebaseCreds.databaseURL}/notes.json`, noteObject).
			success(function(result){
				resolve(result);
			}).error(function(error){
				reject(error);
			});
		});
	};


	let updateSong = function(songArray,songId){
		return $q(function(resolve,reject){
			$http.put(`${FirebaseCreds.databaseURL}/songs/${songId}.json`, songArray).
			success(function(result){
				resolve(result);
			}).error(function(error){
				reject(error);
			});
		});
	};


	let getSongNotes = function(songId){
		return $q(function(resolve,reject){
			$http.get(`${FirebaseCreds.databaseURL}/notes.json?orderBy="songId"&equalTo="${songId}"`).
			success(function(result){
				resolve(result);
			}).error(function(error){
				reject(error);
			});
		});
	};

	let getSongList = function(currentUser){
		return $q(function(resolve,reject){
			$http.get(`${FirebaseCreds.databaseURL}/songs.json?orderBy="uid"&equalTo="${currentUser}"`).
			success(function(result){
				Object.keys(result).forEach(function(key){
					result[key].songId=key;
				});
				resolve(result);
			}).error(function(error){
				reject(error);
			});
		});
	};
	return {pushNewSong, getSongNotes, getSongList, updateSong, pushNewNote};
});