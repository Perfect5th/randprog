// Functions for interacting with the UI.
// The general ethos here is to stay simple, pull the values from the
// input elements and parse them to the appropriate types.

const ui = {
    getCheckboxValue: (id) => document.querySelector(id).checked,
    getIntValue: (id) => parseInt(document.querySelector(id).value),

    // Combines all checkboxes of class `cls` into a set of only the
    // ones that are checked.
    getSet: (cls) => {
        const set = new Set();

        document.querySelectorAll(cls + " input").forEach((elem) => {
            if (elem.checked) {
                set.add(elem.name);
            }
        });

        return set;
    },

    // Marshalls the input values into an object.
    getSettings: () => ({
        rooted: ui.getCheckboxValue("#rooted"),
        includeDiminished: ui.getCheckboxValue("#inc-dim"),
        chordCount: ui.getIntValue("#chord-count"),
        chordTypes: ui.getSet(".chord-type"),
        jazziness: ui.getIntValue("#jazziness"),
    }),

    // Creates the DOM element representing a single chord in the
    // progression, via its name and scale interval, then folds it into
    foldChordElement: (containerElement, [interval, chord]) => {
        const div = document.createElement("div");
        const intervalP = document.createElement("p");
        const chordP = document.createElement("p");

        intervalP.innerText = interval;
        chordP.innerText = chord;
        div.append(intervalP, chordP);
        containerElement.append(div);

        return containerElement;
    },

    // Given a selected scale, array of chord intervals, and array of
    // chord names, produces a title and array of elements per-chord and
    // adds them to `outputElement`.
    renderProgression: ({root, scale, chords}) => {
        const leadP = document.createElement("p");
        const scaleP = document.createElement("p");
        const chordsContainer = chords.reduce(
            ui.foldChordElement,
            document.createElement("div"),
        );

        leadP.innerText = "You should write a song using this fucking chord progression.";
        scaleP.innerText = `${root} ${scale}`;
        chordsContainer.classList.add("flex");

        return [leadP, scaleP, chordsContainer];
    },

    // Wipes `outputElement` and refills it with a new set of chords.
    rerenderProgression: (outputElement, progression) => {
        Array.from(outputElement.childNodes).forEach(c => c.remove());
        outputElement.append(...ui.renderProgression(progression));
    },

    // Toggles the display of `elem`'s `dataset.target` by changing it
    // from `"none"` to `elem.dataset.displayType` or vice-versa.
    // If applicable, swaps `elem`'s text for `elem.dataset.altText`.
    toggleDisplay: (elem) => {
        const target = document.querySelector(`#${elem.dataset.target}`);
        const display = target.style.display;

        if (display === "none") {
            target.style.display = elem.dataset.displayType;
        } else {
            target.style.display = "none";
        }

        if (elem.dataset.altText) {
            const temp = elem.innerText;
            elem.innerText = elem.dataset.altText;
            elem.dataset.altText = temp;
        }
    },

    showSelectedChords: (chordCheckboxes) => {
        const selected = Array.from(ui.getSet(".chord-type"));
        document.querySelector("#checked-chords").innerText = selected
            .map(s => s.split("-")[1]).join(" ");
    },
};
