const ui = {
    getSettings: () => ({
        rooted: document.querySelector("#rooted").checked,
        includeDiminished: document.querySelector("#inc-dim").checked,
        chordCount: parseInt(document.querySelector("#chord-count").value),
    }),

    createChordElement: (progIndex, chord) => {
        const div = document.createElement("div");
        const progP = document.createElement("p");
        const chordP = document.createElement("p");

        progP.innerText = progIndex;
        chordP.innerText = chord;
        div.append(progP, chordP);

        return div;
    },

    clearProgression: (outputElement) => {
        Array.from(outputElement.childNodes).forEach(c => c.remove());
    },

    renderProgression: (outputElement, scale, progIndexes, chords) => {
        const leadP = document.createElement("p");
        const scaleP = document.createElement("p");
        const chordsContainer = document.createElement("div");
        const chordElements = progIndexes.map((p, i) => ui.createChordElement(p, chords[i]));

        leadP.innerText = "You should write a song using this fucking chord progression.";
        scaleP.innerText = scale;
        chordsContainer.classList.add("flex");
        chordsContainer.append(...chordElements);
        outputElement.append(leadP, scaleP, chordsContainer);
    },

    rerenderProgression: (outputElement, ...rest) => {
        ui.clearProgression(outputElement);
        ui.renderProgression(outputElement, ...rest)
    },
};
