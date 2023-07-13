// This is where it all comes together.

window.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("#output");

    const generate = () => {
        // Fetches the settings from the UI, passes them to the
        // progression generator, then updates the UI.
        ui.rerenderProgression(
            body,
            business.generateRandProg(ui.getSettings()),
        );
    };

    document.querySelector("#regen").addEventListener("click", generate);
    document.querySelectorAll(".display-toggler").forEach((toggler) => {
        toggler.addEventListener("click", () => ui.toggleDisplay(toggler));
    });

    const chordCheckboxes = document.querySelectorAll(".chord-type");
    chordCheckboxes.forEach((chordCheckbox) => {
        chordCheckbox.addEventListener("click", () => ui.showSelectedChords(chordCheckboxes));
    });

    generate();
});
