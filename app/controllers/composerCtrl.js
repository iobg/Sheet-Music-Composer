"use strict";
app.controller('composerCtrl', function($scope, DataFactory, $routeParams, noteValueFactory, midiPlayer){
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
    $scope.newNote.src = writtenNote.attr("src");
    $scope.newNote.transform=writtenNote.attr("style");
    $scope.newNote.position = writtenNote.position();
    $scope.newNote.songId = $routeParams.songId;
    $scope.newNote.length= writtenNote.attr("value");
    $scope.allWrittenNotes.push($scope.newNote);
    getNoteLocation($scope.newNote);
    $scope.newNote.audioData=noteValueFactory.getNoteValue(Math.ceil($scope.newNote.position.top));
    $scope.newNote.audioData.lengthOfNote=writtenNote.attr("value");
    midiPlayer.playANote($scope.newNote.audioData.value);
    DataFactory.pushNewNote($scope.newNote).then(function(id){
    $scope.newNote.id=id.name;
    $scope.allWrittenNotes.forEach(function(note){
      if(note.id===undefined){
        note=$scope.newNote;
      }
    });
		counter++;
		$scope.notes =[`note-${counter}`];
     noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
     });
     });
		
	};

 let getNoteLocation=function(note){
   var location=note.transform;
   let x= location.slice(location.indexOf("(")+1, location.indexOf("p"));
   let y= location.slice(location.indexOf(",")+2, location.indexOf(")"));
   y=y.slice(0,y.indexOf("p"));
   note.transformY=Math.floor(y);
   note.transformX=Math.floor(x);
  };

  let getSong = function(){
    $scope.allWrittenNotes=[];
    DataFactory.getSongNotes($routeParams.songId).
    then(function(songRetrieved){
      Object.keys(songRetrieved).forEach(function(note){
        songRetrieved[note].id=note;
        $scope.allWrittenNotes.push(songRetrieved[note]);
      });
    });
    
  };
  getSong();


  $scope.deleteNote=function(noteId){
    DataFactory.deleteNote(noteId).then(function(){
      Materialize.toast('Note Deleted!', 4000);
      getSong();
    });
  };

 $scope.dropEditNote=function($event){
  let writtenNote=$($event.target);
    $scope.editNote={};
    $scope.editNote.class = `${writtenNote[0].className}`;
    $scope.editNote.id= event.target.id;
    $scope.editNote.src = writtenNote.attr("src");
    $scope.editNote.transform=writtenNote.attr("style");
    $scope.editNote.position = writtenNote.position();
    $scope.editNote.songId = $routeParams.songId;
    $scope.editNote.length= writtenNote.attr("value");
    getNoteLocation($scope.editNote);
    $scope.editNote.audioData=noteValueFactory.getNoteValue(Math.ceil($scope.editNote.position.top +150));
    $scope.editNote.audioData=writtenNote.attr("value");
    $scope.makeNoteEditable($scope.editNote);
    $scope.allWrittenNotes.forEach(function(note){
      if(note.id===$scope.editNote.id){
        note=$scope.editNote;
      }
    });
    DataFactory.pushEditNote($scope.editNote, $scope.editNote.id).
    then(function(){
      getSong();
    });

    counter++;
    $scope.notes =[`note-${counter}`];
     noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
     });
    
 
 };


 $scope.makeNoteEditable= function(noteToEdit){
  let x=noteToEdit.transformX,
      y=noteToEdit.transformY;

interact(`#${noteToEdit.id}`)
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

 };


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
