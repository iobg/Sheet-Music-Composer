"use strict";
app.factory("midiPlayer", function(){


let playANote = function (noteToPlay) {
	MIDI.loadPlugin({
		soundfontUrl: "./lib/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {

			var delay = 0.1; // play one note every quarter second
			var note = noteToPlay.value; // the MIDI note
			var velocity = 255; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, parseFloat(noteToPlay.lengthOfNote));
		}
	});
};

let playSong = function (allNotes) {
	allNotes.sort(compare);

	MIDI.loadPlugin({
		soundfontUrl: "./lib/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			let Timeout=0;
	(function myLoop(i) {          
  		setTimeout(function () {    
      		Timeout=allNotes[allNotes.length-i].audioData.lengthOfNote;
      		playANote(allNotes[allNotes.length-i].audioData);             
      		if (--i) myLoop(i);}, (2000 * Timeout))})(allNotes.length); 

			
		}
	});
};

function compare(a,b) {
  if (a.position.left < b.position.left)
    return -1;
  if (a.position.left > b.position.left)
    return 1;
  return 0;
}
return {playANote,playSong};
});
