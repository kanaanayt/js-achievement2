let pokemonList = [];
pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Jigglypuff', height: 5, types: ['fairy', 'normal'] },
  { name: 'Magnemite', height: 3, types: ['electric', 'steel']}
]


let pokemonRepository = (function ()
{
  let repository = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
    loadDetails(pokemon)
    .then( () => {
      showModal(pokemon.name.toUpperCase(),
      'This Pokemon has a whopping height of ' + pokemon.height +  '!!',
      pokemon.imageUrl);
            //console.log(pokemon);
    });
  }
  function getAll()
  {
    return repository;
  }
  function loadList()
  {
    return fetch(apiURL)
    .then( (response) => {
      return response.json();
    })
    .then( (json) => {
      json.results.forEach( (item) => {
        let pokemon = {
          name: item.name,
          detailsURL: item.url
        };
        add(pokemon);
      });
    })
    .catch( (e) => {
      console.error(e);
    })
  }
  function loadDetails(pokemon)
  {
    let url = pokemon.detailsURL;
    return fetch(url)
    .then( (response) => {
      return response.json();
    })
    .then( (details) => {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    })
    .catch( (e) => {
      console.error(e);
    });
  }
  function showModal(title, text, url)
  {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.classList.add('center');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  function hideModal()
  {
    modalContainer.classList.remove('is-visible');
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) { hideModal(); }
  });
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) { hideModal(); }
  });
  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList()
.then( () => {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// console.log(pokemonRepository.getAll());
//
// pokemonList.forEach(function(pokemon)
// {
//   pokemonRepository.add(pokemon);
// });
//
// console.log(pokemonRepository.getAll());
//
// pokemonRepository.getAll().forEach(function(pokemon) {
//   pokemonRepository.addListItem(pokemon);
// });
