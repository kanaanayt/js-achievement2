let pokemonList = [];
pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Jigglypuff', height: 5, types: ['fairy', 'normal'] },
  { name: 'Magnemite', height: 3, types: ['electric', 'steel']}
]


let pokemonRepository = (function ()
{
  let pokemonListIIFE = [];
  function add(pokemon)
  {
    pokemonListIIFE.push(pokemon);
  }
  function getAll()
  {
    return pokemonListIIFE;
  }
  return {
    add: add,
    getAll: getAll
  };
})();

pokemonList.forEach(function(pokemon)
{
  pokemonRepository.add(pokemon);
});

console.log(pokemonRepository.getAll());

// for (let index = 0; index < pokemonList.length; index++)
// {
//   let message = "";
//   if (pokemonList[index].height > 6)
//   {
//     message = " - Wow that's big!";
//   }
//   document.write("<p>" + "Name: " + pokemonList[index].name + "</p>");
//   document.write("<p>" + "Height: " + pokemonList[index].height + message + "</p>");
//   document.write("<p>" + "Types: " + pokemonList[index].types[0] + " and " + pokemonList[index].types[1] +  "</p>");
// };
