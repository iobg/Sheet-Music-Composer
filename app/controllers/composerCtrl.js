app.controller('composerCtrl', function($scope){
	let counter =0;
	$scope.notes=[`note-${counter}`];
	setMasterNote(`#${$scope.notes[0]}`);
	


	$scope.drop=function(){
		let newNote=$(`#note-${counter}`);
		newNote.removeClass();
		newNote.addClass("writtenNote");
    console.log(newNote.css("transform"));
    //will eventually be stored in an object for saving songs
		$(".staff").append(newNote);
    interact(`#note-${counter}`).draggable(false);
    

		counter++;
		$scope.notes =[`note-${counter}`];
    
     
		setMasterNote(`#${$scope.notes[0]}`);
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
