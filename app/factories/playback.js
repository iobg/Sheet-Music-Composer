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
			var delay = 0; // play one note every quarter second
			var note = noteToPlay; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});
};
return {playANote};
});
