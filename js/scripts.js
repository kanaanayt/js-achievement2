let pokemonList = [];
pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Jigglypuff', height: 5, types: ['fairy', 'normal'] },
  { name: 'Magnemite', height: 3, types: ['electric', 'steel']}
]


let pokemonRepository = (function ()
{
  let repository = [];
  function add(pokemon)
  {
    repository.push(pokemon);
  }
  function addListItem(pokemon)
  {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', showDetails.bind(null, pokemon));
  }
  function showDetails(pokemon)
  {
    console.log(pokemon.name);
  }
  function getAll()
  {
    return repository;
  }
  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll());

pokemonList.forEach(function(pokemon)
{
  pokemonRepository.add(pokemon);
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
