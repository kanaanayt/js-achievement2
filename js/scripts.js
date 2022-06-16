let pokemonList = [];
pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Jigglypuff', height: 5, types: ['fairy', 'normal'] },
  { name: 'Magnemite', height: 3, types: ['electric', 'steel']}
]

for (let index = 0; index < pokemonList.length; index++)
{
  let message = "";
  if (pokemonList[index].height > 6)
  {
    message = " - Wow that's big!";
  }
  document.write("<p>" + "Name: " + pokemonList[index].name + "</p>");
  document.write("<p>" + "Height: " + pokemonList[index].height + message + "</p>");
  document.write("<p>" + "Types: " + pokemonList[index].types[0] + " and " + pokemonList[index].types[1] +  "</p>");
};
