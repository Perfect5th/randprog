window.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("#output");

    const generate = () => {
        const {rooted, includeDiminished, chordCount} = ui.getSettings();

        const {
            root,
            scale,
            progIndexes,
            progChords,
        } = business.generateRandProg(rooted, includeDiminished, chordCount);

        ui.rerenderProgression(body, `${root} ${scale}`, progIndexes, progChords);
    };

    document.querySelector("#regen").addEventListener("click", generate);

    generate();
});
