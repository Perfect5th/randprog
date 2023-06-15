window.addEventListener("DOMContentLoaded", () => {
    const SCALES = {
        major: [ "", null,   "m", null,  "m",  "", null,  "", null,  "m", null, "dim"],
        minor: ["m", null, "dim",   "", null, "m", null, "m",   "", null,   "",  null],
    };
    const NUMERALS = {
        major: ["I", null,  "ii",  null, "iii", "IV", null, "V", null, "vi",  null, "viio"],
        minor: ["i", null, "iio", "III",  null, "iv", null, "v", "VI", null, "VII",   null],
    };
    const ROOTS = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab"];
    const ASCALES = {
        major: {
            C: ROOTS,
            G: ROOTS,
            D: ROOTS.map(n => n === "Db" ? "C#" : n),
            Db: ROOTS.map(n => n === "F#" ? "Gb" : n),
            Ab: ROOTS,
            Eb: ROOTS,
            Bb: ROOTS,
            F: ROOTS,
        },
        minor: {
            C: ROOTS,
            G: ROOTS,
            D: ROOTS,
            A: ROOTS,
            E: ROOTS,
            B: ROOTS.map(n => n === "Db" ? "C#" : n),
            Eb: ROOTS.map(n => n === "F#" ? "Gb" : (n === "B" ? "Cb" : n)),
            F: ROOTS,
        }
    }
    ASCALES.major.A = ASCALES.major.D.map(n => n === "Ab" ? "G#" : n);
    ASCALES.major.E = ASCALES.major.A.map(n => n === "Eb" ? "D#" : n);
    ASCALES.major.B = ASCALES.major.E.map(n => n === "Bb" ? "A#" : n);
    ASCALES.major["F#"] = ASCALES.major.B.map(n => n === "F" ? "E#": n);
    ASCALES.minor["F#"] = ASCALES.minor.B.map(n => n === "Ab" ? "G#" : n);
    ASCALES.minor["C#"] = ASCALES.minor["F#"].map(n => n === "Eb" ? "D#" : n);
    ASCALES.minor.Db = ASCALES.minor["C#"];
    ASCALES.minor["G#"] = ASCALES.minor["C#"].map(n => n === "Bb" ? "A#" : n);
    ASCALES.minor.Ab = ASCALES.minor["G#"];
    ASCALES.minor.Bb = ASCALES.minor.Eb;

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
        const keyI = Math.floor(Math.random() * ROOTS.length);
        const ascale = ASCALES[scaleKey][ROOTS[keyI]];
        const root = ascale[keyI];

        const prog = [];
        const progChords = [];
        let chordCountdown = parseInt(chordCountInput.value);

        if (rooted) {
            prog.push(numerals[0]);
            progChords.push(root + scale[0]);
            chordCountdown--;
        }

        while (chordCountdown) {
            const next = Math.floor(Math.random() * ascale.length);
            const nextNote = (next + keyI) % ascale.length;

            if (scale[next] === null) {
                continue;
            }

            if (!incDim && scale[next] === "dim") {
                continue;
            }

            prog.push(numerals[next]);
            progChords.push(ascale[nextNote] + scale[next]);
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
