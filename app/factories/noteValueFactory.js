"use strict";
app.factory("noteValueFactory", function(){
	let notes=[
		{		
		name:"A6",
		position:336,
		value:81
		},
		{		
		name:"B6",
		position:312,
		value:83
		},
		{		
		name:"C6",
		position:289,
		value:72
		},
		{		
		name:"D6",
		position:264,
		value:74
		},
		{		
		name:"E6",
		position:240,
		value:76
		},
		{		
		name:"F6",
		position:216,
		value:77
		},
		{		
		name:"G6",
		position:192,
		value:79
		}
	];

	let getNoteValue= function(position){
		let currentNote = null;
		console.log(position);
			notes.forEach(function(note){
				if(position === note.position || position === note.position+1 || position === note.position-1) {
					console.log("MIDI value", note.value);
					console.log("Note", note.name);
					currentNote = note;
				}
			});
			return currentNote;
	};
	return {getNoteValue};
});