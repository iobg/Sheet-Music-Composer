app.controller('composerCtrl', function($scope){
	let counter =0;
  let noteTypes= ["quarter","half"];
	$scope.notes=[`note-${counter}`];
   noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
    });
  
  let allWrittenNotes=[];
	


	$scope.drop=function($event){
    console.log($($event.target)[0].className);
    //gets type of note dropped
    let currentClass = $($event.target)[0].className;
		let newNote=$($event.target);
		newNote.removeClass();
		newNote.addClass(`written${currentClass}`);
    newNote.attr("id", `note${counter}`);
    console.log(newNote.css("transform"));
    //will eventually be stored in an object for saving
		$(".staff").append(newNote);
    interact(`#${currentClass}${$scope.notes[0]}`).draggable(false);
		counter++;
		$scope.notes =[`note-${counter}`];
     noteTypes.forEach(function(className){
      setMasterNote(`#${className}${$scope.notes[0]}`);
     });
		
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
    inertia: true,
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
