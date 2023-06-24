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
        // Selects a value from `JAZZY_BOIS` based on a roll against the
        // keys of that object.
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

    jazzify: (jazziness, [index, chord]) => {
        // Randomly augments a chord with a `JAZZY_BOI` based on a role
        // against `jazziness` (int).
        const roll = business.randInt(100);

        if (roll < jazziness) {
            const jazzyBoi = business.getJazzyBoi();

            return {
                index: index + jazzyBoi,
                chord: chord + jazzyBoi,
            };
        }

        return [index, chord];
    },

    generateChord: (aScale, keyI, scale, includeDiminished, numerals) => {
        // Produce a chord from the scale `aScale`. Retrying if the
        // chord is diminished and `includeDiminished` is false.
        let next = null;
        let nextI = null;

        while (next === null) {
            nextI = business.randInt(aScale.length);
            next = scale[nextI];

            if (!includeDiminished && next === "dim") {
                next = null;
            }
        }

        const nextNoteI = (nextI + keyI) % aScale.length;

        return [numerals[nextI], aScale[nextNoteI] + next];
    },

    generateChordsForScale: ({
        rooted,
        includeDiminished,
        chordCount,
        jazziness,
        keyI,
        scaleKey,
    }) => {
        // Generates a progression of `chordCount` chords in the key of
        // `music.ROOTS[keyI]` on the `music.SCALES[scaleKey]` scale.
        //
        // `jazziness` (int) in range [0-100] that determines how likely
        //     a given chord is to be `jazzified`.
        // `includeDiminished` (boolean) determines whether diminished
        //     chords are allowed in the progression.
        const aScale = music.ASCALES[scaleKey][music.ROOTS[keyI]];
        const scale = music.SCALES[scaleKey];
        const numerals = music.NUMERALS[scaleKey];

        let chordCountdown = chordCount;
        const chords = [];

        if (rooted) {
            chords.push(business.jazzify(
                jazziness,
                [numerals[0], aScale[keyI] + scale[0]],
            ));
            chordCountdown--;
        }

        for (let i = 0; i < chordCountdown; i++) {
            chords.push(business.jazzify(
                jazziness,
                business.generateChord(aScale, keyI, scale, includeDiminished, numerals),
            ));
        }

        return chords;
    },

    generateRandProg: (settings) => {
        // Selects a random key and scale and chord progression
        const keyI = business.selectRandIndex(music.ROOTS);
        const scaleKey = business.selectRandKey(music.SCALES);

        return {
            root: music.getRoot(scaleKey, keyI),
            scale: scaleKey,
            chords: business.generateChordsForScale({
                keyI,
                scaleKey,
                ...settings,
            }),
        }
    },
};
