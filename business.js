const business = {
    randInt: (maxInt) => Math.floor(Math.random() * maxInt),

    selectRandKey: (obj) => {
        const keys = Object.keys(obj);
        return keys[business.randInt(keys.length)];
    },

    selectRandIndex: (arr) => business.randInt(arr.length),

    generateChordsForScale: (
        rooted,
        includeDiminished,
        chordCount,
        keyI,
        scaleKey,
    ) => {
        const aScale = music.ASCALES[scaleKey][music.ROOTS[keyI]];
        const scale = music.SCALES[scaleKey];
        const numerals = music.NUMERALS[scaleKey];

        const progIndexes = [];
        const progChords = [];
        let chordCountdown = chordCount;

        if (rooted) {
            progIndexes.push(numerals[0]);
            progChords.push(aScale[keyI] + scale[0]);
            chordCountdown--;
        }

        while (chordCountdown) {
            const nextI = business.randInt(aScale.length);
            const nextNoteI = (nextI + keyI) % aScale.length;
            const next = scale[nextI];

            if (next === null) {
                continue;
            }

            if (!includeDiminished && next === "dim") {
                continue;
            }

            progIndexes.push(numerals[nextI]);
            progChords.push(aScale[nextNoteI] + next);
            chordCountdown--;
        }

        return {progIndexes, progChords};
    },

    generateRandProg: (rooted, includeDiminished, chordCount) => {
        const keyI = business.selectRandIndex(music.ROOTS);
        const scaleKey = business.selectRandKey(music.SCALES);

        return {
            root: music.getRoot(scaleKey, keyI),
            scale: scaleKey,
            ...business.generateChordsForScale(
                rooted,
                includeDiminished,
                chordCount,
                keyI,
                scaleKey,
            ),
        }
    },
};
