const music = {
    SCALES: {
        major: [ "", null,   "m", null,  "m",  "", null,  "", null,  "m", null, "dim"],
        minor: ["m", null, "dim",   "", null, "m", null, "m",   "", null,   "",  null],
    },

    NUMERALS: {
        major: ["I", null,  "ii",  null, "iii", "IV", null, "V", null, "vi",  null, "viio"],
        minor: ["i", null, "iio", "III",  null, "iv", null, "v", "VI", null, "VII",   null],
    },

    ROOTS: ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab"],

    getRoot: (scaleKey, rootKey) => music.ASCALES[scaleKey][music.ROOTS[rootKey]][rootKey],
};

music.ASCALES = {
    major: {
        C: music.ROOTS,
        G: music.ROOTS,
        D: music.ROOTS.map(n => n === "Db" ? "C#" : n),
        Db: music.ROOTS.map(n => n === "F#" ? "Gb" : n),
        Ab: music.ROOTS,
        Eb: music.ROOTS,
        Bb: music.ROOTS,
        F: music.ROOTS,
    },
    minor: {
        C: music.ROOTS,
        G: music.ROOTS,
        D: music.ROOTS,
        A: music.ROOTS,
        E: music.ROOTS,
        B: music.ROOTS.map(n => n === "Db" ? "C#" : n),
        Eb: music.ROOTS.map(n => n === "F#" ? "Gb" : (n === "B" ? "Cb" : n)),
        F: music.ROOTS,
    }
};

music.ASCALES.major.A = music.ASCALES.major.D.map(n => n === "Ab" ? "G#" : n);
music.ASCALES.major.E = music.ASCALES.major.A.map(n => n === "Eb" ? "D#" : n);
music.ASCALES.major.B = music.ASCALES.major.E.map(n => n === "Bb" ? "A#" : n);
music.ASCALES.major["F#"] = music.ASCALES.major.B.map(n => n === "F" ? "E#": n);
music.ASCALES.minor["F#"] = music.ASCALES.minor.B.map(n => n === "Ab" ? "G#" : n);
music.ASCALES.minor["C#"] = music.ASCALES.minor["F#"].map(n => n === "Eb" ? "D#" : n);
music.ASCALES.minor.Db = music.ASCALES.minor["C#"];
music.ASCALES.minor["G#"] = music.ASCALES.minor["C#"].map(n => n === "Bb" ? "A#" : n);
music.ASCALES.minor.Ab = music.ASCALES.minor["G#"];
music.ASCALES.minor.Bb = music.ASCALES.minor.Eb;
