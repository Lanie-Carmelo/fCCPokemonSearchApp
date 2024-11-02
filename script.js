const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");
const errorMessage = document.getElementById("error-message");
const loadingMessage = document.getElementById("loading");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonImage = document.getElementById('sprite');
const pokemonAbilities = document.getElementById("abilities");

async function fetchData(pokemonNameOrId) {
  // Convert input to lowercase and trim whitespace
  const formattedInput = pokemonNameOrId.toLowerCase().trim();
  console.log('Searching for:', formattedInput); // Debug log
  
  // Make the fetch request for specific pokemon
  const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedInput}`);
  console.log('Response status:', response.status); // Debug log
  
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  
  const data = await response.json();
  console.log('Data received:', data); // Debug log
  return data;
}

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  console.log('Search term:', searchTerm); // Debug log
  const errorMessage = document.getElementById('error-message');
  const loading = document.getElementById('loading');

  try {
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    
    const pokemonData = await fetchData(searchTerm);
    
    // Show results div if it was hidden
    resultsDiv.style.display = 'block';
    
    // Update the UI with pokemon data
    pokemonName.textContent = pokemonData.name.toUpperCase();
    pokemonId.textContent = `#${pokemonData.id}`;
    pokemonWeight.textContent = `Weight: ${pokemonData.weight}`;
    pokemonHeight.textContent = `Height: ${pokemonData.height}`;
    
    // Clear and update types - handle with more safety
    pokemonTypes.innerHTML = '';  // Clear previous types
    if (pokemonData.types && Array.isArray(pokemonData.types)) {
        pokemonData.types.forEach(typeInfo => {
            const typeElement = document.createElement('span');
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            pokemonTypes.appendChild(typeElement);
        });
    }
    
    // Update image
    pokemonImage.id = 'sprite';
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.alt = pokemonData.name;
    
    // Update stats
    if (pokemonData.stats && Array.isArray(pokemonData.stats)) {
        pokemonHp.textContent = pokemonData.stats[0].base_stat;
        pokemonAttack.textContent = pokemonData.stats[1].base_stat;
        pokemonDefense.textContent = pokemonData.stats[2].base_stat;
        pokemonSpecialAttack.textContent = pokemonData.stats[3].base_stat;
        pokemonSpecialDefense.textContent = pokemonData.stats[4].base_stat;
        pokemonSpeed.textContent = pokemonData.stats[5].base_stat;
    }

    // Update abilities
    if (pokemonData.abilities && Array.isArray(pokemonData.abilities)) {
        pokemonAbilities.textContent = pokemonData.abilities
            .map(ability => ability.ability.name)
            .join(' ');
    }

} catch (error) {
    console.error('Error fetching data:', error.message);
    errorMessage.textContent = 'Pokémon not found';
    alert('Pokémon not found');
    resultsDiv.style.display = 'none';
    loadingMessage.style.display = 'none';
    // Clear all fields
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    pokemonWeight.textContent = '';
    pokemonHeight.textContent = '';
    pokemonTypes.innerHTML = '';
    pokemonHp.textContent = '';
    pokemonAttack.textContent = '';
    pokemonDefense.textContent = '';
    pokemonSpecialAttack.textContent = '';
    pokemonSpecialDefense.textContent = '';
    pokemonSpeed.textContent = '';
    pokemonImage.src = '';
    pokemonAbilities.innerHTML = '';
    errorMessage.style.display = 'block';
} finally {
    loading.style.display = 'none';
}
});