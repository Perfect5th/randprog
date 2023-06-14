window.addEventListener("DOMContentLoaded", () => {
    const SCALES = {
        major: [ "", null,   "m", null,  "m",  "", null,  "", null,  "m", null, "dim"],
        minor: ["m", null, "dim",   "", null, "m", null, "m",   "", null,   "",  null],
    };
    const NUMERALS = {
        major: ["I", null,  "ii",  null, "iii", "IV", null, "V", null, "vi",  null, "viio"],
        minor: ["i", null, "iio", "III",  null, "iv", null, "v", "VI", null, "VII",   null],
    };

    const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    const ROOTED = true;
    const CHORD_COUNT = 4;

    const scaleKeys = Object.keys(SCALES);
    const scaleKey = scaleKeys[Math.floor(Math.random() * scaleKeys.length)];
    const scale = SCALES[scaleKey];
    const numerals = NUMERALS[scaleKey];
    const keyI = Math.floor(Math.random() * NOTES.length);
    const root = NOTES[keyI];

    const prog = [];
    const progChords = [];
    let chordCount = CHORD_COUNT;

    if (ROOTED) {
        prog.push(numerals[0]);
        progChords.push(root + scale[0]);
        chordCount--;
    }

    while (chordCount) {
        let next = Math.floor(Math.random() * NOTES.length);
        next = (next + keyI) % NOTES.length;

        if (scale[next] !== null) {
            prog.push(numerals[next]);
            progChords.push(NOTES[next] + scale[next]);
            chordCount--;
        }
    }

    const leadP = document.createElement("p");
    leadP.innerText = "You should write a song using this fucking chord progression.";
    const scaleP = document.createElement("p");
    scaleP.innerText = `${root} ${scaleKey}`;

    const progDiv = document.createElement("div");
    prog.forEach((p) => {
        const progP = document.createElement("p");
        progP.innerText = p;
        progDiv.append(progP);
    });
    progDiv.classList.add("flex");

    const progChordsDiv = document.createElement("div");
    progChords.forEach((progChord) => {
        const progChordP = document.createElement("p");
        progChordP.innerText = progChord;
        progChordsDiv.append(progChordP);
    });
    progChordsDiv.classList.add("flex");

    const body = document.querySelector("body");
    body.append(leadP, scaleP, progDiv, progChordsDiv);
});
