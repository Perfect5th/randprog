const business = {
    randInt: (maxInt) => Math.floor(Math.random() * maxInt),

    selectRandKey: (obj) => {
        const keys = Object.keys(obj);
        return keys[business.randInt(keys.length)];
    },

    selectRandIndex: (arr) => business.randInt(arr.length),

    JAZZY_BOIS: {
        899: "7",
        949: "7b5",
        999: "9",
        1000: "7#9",
    },
    getJazzyBoi: (manualRoll) => {
        const numBois = Object.keys(business.JAZZY_BOIS).map(k => parseInt(k));
        const roll = manualRoll || business.randInt(Math.max(...numBois));

        for (const boi of numBois) {
            if (boi > roll) {
                return business.JAZZY_BOIS[boi];
            }
        }

        // This shouldn't happen, but failsafe just because.
        return business.JAZZY_BOIS[numBois[0]];
    },

    jazzify: (index, chord, jazziness) => {
        const roll = business.randInt(100);

        if (roll < jazziness) {
            const jazzyBoi = business.getJazzyBoi();

            return {
                index: index + jazzyBoi,
                chord: chord + jazzyBoi,
            };
        }

        return {index, chord};
    },

    generateChordsForScale: (
        rooted,
        includeDiminished,
        chordCount,
        jazziness,
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
            const {index, chord} = business.jazzify(
                numerals[0],
                aScale[keyI] + scale[0],
                jazziness,
            );

            progIndexes.push(index);
            progChords.push(chord);
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

            const {index, chord} = business.jazzify(
                numerals[nextI],
                aScale[nextNoteI] + next,
                jazziness,
            );

            progIndexes.push(index);
            progChords.push(chord);
            chordCountdown--;
        }

        return {progIndexes, progChords};
    },

    generateRandProg: (rooted, includeDiminished, chordCount, jazziness) => {
        const keyI = business.selectRandIndex(music.ROOTS);
        const scaleKey = business.selectRandKey(music.SCALES);

        return {
            root: music.getRoot(scaleKey, keyI),
            scale: scaleKey,
            ...business.generateChordsForScale(
                rooted,
                includeDiminished,
                chordCount,
                jazziness,
                keyI,
                scaleKey,
            ),
        }
    },
};
