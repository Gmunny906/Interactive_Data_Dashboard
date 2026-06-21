//Creating variables for the HTML elements made
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const message = document.getElementById("message");
const sortSelect = document.getElementById("sortSelect");

let pokemonData = [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const searchTerm = 
        searchInput.value.toLowerCase();

    const filteredPokemon = 
        pokemonData.filter((pokemon) => 
            pokemon.name.includes(searchTerm)
        );

    displayPokemon(filteredPokemon);
});

sortSelect.addEventListener("change", () => {
    sortPokemon();
});

async function loadPokemon() {

    message.textContent = "Loading Pokemon...";

    try {

        pokemonData = [];

        for (let i = 1; i <= 50; i++) {

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${i}`
            );

            const data = await response.json();

            pokemonData.push(data);
        }

        displayPokemon();

        message.textContent = "50 Pokemon Loaded.";

    } catch (error) {

        message.textContent = 
            "Error loading pokemon.";

        console.error(error);
    }
}


//This is the card creator for the pokemon that will show up

function displayPokemon(data = pokemonData) {

    results.innerHTML = "";

    data.forEach((pokemon) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            
            <h2>${pokemon.name.toUpperCase()}</h2>

            <img src="${pokemon.sprites.front_default || ''}">

            <button class="details-btn">
                Show Details
            </button>

            <div class="details">
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
                <p>Base Experience: ${pokemon.base_experience}</p>
            </div>

            `;

        const detailsBtn = card.querySelector(".details-btn");

        const detailsDiv = card.querySelector(".details");

        detailsBtn.addEventListener("click", () => {

            detailsDiv.classList.toggle("show");

            if (detailsDiv.classList.contains("show")) {
                detailsBtn.textContent = "Hide Details";
            } else {
                detailsBtn.textContent = "Show Details";
            }
        });

        results.appendChild(card);
    });
}

//This is the third feature, it is a sort feature

function sortPokemon() {

    const order = sortSelect.value;

    if (order === "az") {

        pokemonData.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else {

        pokemonData.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    displayPokemon();
}


window.addEventListener("DOMContentLoaded", () => {
    loadPokemon();
});
