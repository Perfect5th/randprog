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

    const rootedCheckbox = document.querySelector("#rooted");
    const chordCountInput = document.querySelector("#chord-count");
    const incDimCheckbox = document.querySelector("#inc-dim");
    const body = document.querySelector("#output");

    const generateChords = () => {
        const rooted = rootedCheckbox.checked;
        const incDim = incDimCheckbox.checked;

        const scaleKeys = Object.keys(SCALES);
        const scaleKey = scaleKeys[Math.floor(Math.random() * scaleKeys.length)];
        const scale = SCALES[scaleKey];
        const numerals = NUMERALS[scaleKey];
        const keyI = Math.floor(Math.random() * NOTES.length);
        const root = NOTES[keyI];

        const prog = [];
        const progChords = [];
        let chordCountdown = parseInt(chordCountInput.value);

        if (rooted) {
            prog.push(numerals[0]);
            progChords.push(root + scale[0]);
            chordCountdown--;
        }

        while (chordCountdown) {
            const next = Math.floor(Math.random() * NOTES.length);
            const nextNote = (next + keyI) % NOTES.length;

            if (scale[next] === null) {
                continue;
            }

            if (!incDim && scale[next] === "dim") {
                continue;
            }

            prog.push(numerals[next]);
            progChords.push(NOTES[nextNote] + scale[next]);
            chordCountdown--;
        }

        Array.from(body.childNodes).forEach(c => c.remove());

        const leadP = document.createElement("p");
        leadP.innerText = "You should write a song using this fucking chord progression:";
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

        body.append(leadP, scaleP, progDiv, progChordsDiv);
    };

    document.querySelector("#regen").addEventListener("click", () => generateChords());

    generateChords(rootedCheckbox.value === "on", parseInt(chordCountInput.value));
});
