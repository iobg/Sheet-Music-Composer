"use strict";
app.controller('composerCtrl', function($scope, DataFactory, $routeParams){
	let counter =0;
  let noteTypes= ["quarter","half", "whole", "eighth"];
	$scope.notes=[`note-${counter}`];
   noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
    });
  
  $scope.allWrittenNotes=[];
	


	$scope.drop=function($event){
    let writtenNote=$($event.target);
    console.log($routeParams.songId)

    $scope.newNote={};
    $scope.newNote.class = `written${writtenNote[0].className}`;
		$scope.newNote.id= `note${counter}`;
    $scope.newNote.src = writtenNote.attr("src");
    $scope.newNote.transform=writtenNote.attr("style");
    $scope.newNote.position = writtenNote.position();
    $scope.newNote.songId = $routeParams.songId;
    DataFactory.pushNewNote($scope.newNote).then(function(result){
      console.log(result);
    })

    $scope.allWrittenNotes.push($scope.newNote);
 
    interact(`#${$scope.newNote.class}${$scope.notes[0]}`).draggable(false);
		counter++;
		$scope.notes =[`note-${counter}`];
     noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
     });
		
	}

  let getSong = function(){
    $scope.allWrittenNotes=[];
    DataFactory.getSongNotes($routeParams.songId).
    then(function(songRetrieved){
      Object.keys(songRetrieved).forEach(function(note){
        $scope.allWrittenNotes.push(songRetrieved[note]);
      });
    });
    
  }
  getSong();





function setMasterNote(masterNote){
	let x=0,
	   	y=0;


interact(masterNote)
  .draggable({
    snap: {
      targets: [
        interact.createSnapGrid({ x: 75, y: 24 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },
    inertia: false,
    restrict: {
   		restriction: "parent",
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
      endOnly: true
    }
  })
  .on('dragmove', function (event) {
    x += event.dx;
    y += event.dy;

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
  });
}
});
