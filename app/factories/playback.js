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

			var delay = parseInt(noteToPlay.lengthOfNote); // play one note every quarter second
			var note = noteToPlay.value; // the MIDI note
			var velocity = 255; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay);
		}
	});
};

let playSong = function (allNotes) {
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
      		console.log("it werk?"); 
      		Timeout=allNotes[allNotes.length-i].audioData.lengthOfNote;
      		playANote(allNotes[allNotes.length-i].audioData);             
      		if (--i) myLoop(i);}, (1000 * Timeout))})(allNotes.length); 

			
		}
	});
};
return {playANote,playSong};
});
