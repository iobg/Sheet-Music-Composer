"use strict";
app.factory("noteValueFactory", function(){
	let notes=[
		{		
		name:"A6",
		position:336,
		value:69
		},
		{		
		name:"B6",
		position:312,
		value:71
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
		},
		{		
		name:"A5",
		position:360,
		value:67
		},
		{		
		name:"B5",
		position:384,
		value:65
		},
		{		
		name:"C5",
		position:408,
		value:64
		},
		{		
		name:"D5",
		position:432,
		value:62
		},
		{		
		name:"E5",
		position:456,
		value:60
		},
		{		
		name:"F5",
		position:480,
		value:59
		},
		{		
		name:"G5",
		position:504,
		value:57
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