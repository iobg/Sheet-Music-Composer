"use strict";
app.controller('composerCtrl', function($scope, DataFactory){
	let counter =0;
  let noteTypes= ["quarter","half", "whole", "eighth"];
	$scope.notes=[`note-${counter}`];
   noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
    });
  
  $scope.allWrittenNotes=[];
	


	$scope.drop=function($event){
    let writtenNote=$($event.target);

    $scope.newNote={};
    $scope.newNote.class = `written${writtenNote[0].className}`;
		$scope.newNote.id= `note${counter}`;
    $scope.newNote.src = writtenNote.attr("src");
    $scope.newNote.transform=writtenNote.attr("style");
    $scope.newNote.position = writtenNote.position();
    $scope.allWrittenNotes.push($scope.newNote);
 
    interact(`#${$scope.newNote.class}${$scope.notes[0]}`).draggable(false);
		counter++;
		$scope.notes =[`note-${counter}`];
     noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
     });
     console.log($scope.allWrittenNotes)
		
	}

  $scope.saveSong=function(){
    DataFactory.pushNewSong($scope.allWrittenNotes)
  }
  $scope.getSong = function(){
    $scope.allWrittenNotes=DataFactory.getSong("-KNs5LmGtsuUzD9GlvVs").
    then(function(songRetrieved){
      $scope.allWrittenNotes=songRetrieved;
    })
    
  }





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
