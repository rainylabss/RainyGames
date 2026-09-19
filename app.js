const games = [

    {
        name: "RainyCrash",
        category: "Racing",
        type: "car",
        file: "rainy-crash.html",
        description: "Drive and survive the traffic."
    },

    {
        name: "Rainy Racer",
        category: "Racing",
        type: "car",
        file: "rainy-racer.html",
        description: "Race to the finish."
    },

    {
        name: "Rainy Snake",
        category: "Arcade",
        type: "quick",
        file: "rainy-snake.html",
        description: "Eat, grow and survive."
    },

    {
        name: "Rainy Reaction",
        category: "Arcade",
        type: "quick",
        file: "rainy-reaction.html",
        description: "Test your reaction speed."
    },

    {
        name: "Rainy Jump",
        category: "Platform",
        type: "quick",
        file: "rainy-jump.html",
        description: "Jump as far as you can."
    },

    {
        name: "RainyDino",
        category: "Arcade",
        type: "quick",
        file: "rainy-dino.html",
        description: "Run, jump and survive as the speed increases."
    }

];


function makeCard(game) {

    return `
        <div
            class="game-card"
            onclick="openGame('${game.file}')"
        >

            <div class="game-card-top"></div>

            <h3>${game.name}</h3>

            <p>${game.description}</p>

            <span class="tag">${game.category}</span>

        </div>
    `;

}


function render(list, elementId) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    if (list.length === 0) {

        element.innerHTML =
            `<div class="empty">No games found.</div>`;

        return;

    }

    element.innerHTML =
        list.map(makeCard).join("");

}


function renderHome() {

    render(
        games,
        "gameGrid"
    );

    render(
        games.filter(
            game => game.type === "car"
        ),
        "carGrid"
    );

    render(
        games.filter(
            game => game.type === "quick"
        ),
        "quickGrid"
    );

    renderRecent();

}


function openGame(file) {

    let recent =
        JSON.parse(
            localStorage.getItem(
                "rainyRecent"
            ) || "[]"
        );

    recent =
        recent.filter(
            game => game !== file
        );

    recent.unshift(file);

    recent =
        recent.slice(0, 6);

    localStorage.setItem(
        "rainyRecent",
        JSON.stringify(recent)
    );

    window.location.href = file;

}


function renderRecent() {

    const recent =
        JSON.parse(
            localStorage.getItem(
                "rainyRecent"
            ) || "[]"
        );

    const recentGames =
        recent
            .map(
                file =>
                    games.find(
                        game =>
                            game.file === file
                    )
            )
            .filter(Boolean);

    render(
        recentGames,
        "recentGrid"
    );

}


function searchGames() {

    const query =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();

    const results =
        games.filter(
            game =>
                game.name
                    .toLowerCase()
                    .includes(query) ||

                game.category
                    .toLowerCase()
                    .includes(query) ||

                game.description
                    .toLowerCase()
                    .includes(query)
        );

    render(
        results,
        "gameGrid"
    );

}


function showCategory(category) {

    if (category === "All") {

        render(
            games,
            "gameGrid"
        );

        return;

    }

    const filtered =
        games.filter(
            game =>
                game.category === category
        );

    render(
        filtered,
        "gameGrid"
    );

    window.scrollTo({

        top:
            document
                .getElementById(
                    "gameGrid"
                )
                .getBoundingClientRect()
                .top
            +
            window.scrollY
            -
            100,

        behavior: "smooth"

    });

}


function goHome() {

    window.location.href =
        "index.html";

}


renderHome();
