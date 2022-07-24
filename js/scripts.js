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
    let listPokemon = document.createElement('button');
    listPokemon.classList.add("list-group-item");
    listPokemon.classList.add("list-group-item-action");
    listPokemon.classList.add("btn");
    listPokemon.classList.add("btn-primary");
    listPokemon.setAttribute("type", "button");
    listPokemon.setAttribute("data-toggle", "modal");
    listPokemon.setAttribute("data-target", "#myModal");
    listPokemon.innerText = pokemon.name;
    //showDetails(pokemon);
    // let button = document.createElement('button');
    // button.innerText = pokemon.name;
    // button.classList.add("button-class");
    // listPokemon.appendChild(button);

    // let newButton = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="myModal">');
    // newButton.innerText = pokemon.name;
    // newButton.classList.add("button-class");
    // listPokemon.appendChild(newButton);
    pokemonList.appendChild(listPokemon);
    listPokemon.addEventListener('click', showDetails.bind(null, pokemon));
  }
  function showDetails(pokemon)
  {
    loadDetails(pokemon)
    .then( (loadedPokemon) => {
      showModal(loadedPokemon);
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
      return {
        detailsURL: pokemon.detailsURL,
        imageUrl: details.sprites.front_default,
        height: details.height,
        types: details.types
      };
    })
    .catch( (e) => {
      console.error(e);
    });
  }
  function showModal(item)
  {
    console.log(item);
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = $("<img class='modal-img'/>");
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "has a whopping height of " + item.height + "</p>");
    let typesElement = $("<p>" + " and is of type(s) " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);

    //
    // let modal = document.createElement('div');
    // modal.classList.add('modal');
    //
    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';
    // closeButtonElement.addEventListener('click', hideModal);
    //
    // let titleElement = document.createElement('h1');
    // titleElement.innerText = title;
    //
    // let contentElement = document.createElement('p');
    // contentElement.innerText = text;
    //
    // let imageElement = document.createElement('img');
    // imageElement.src = url;
    // imageElement.classList.add('center');
    //
    // modal.appendChild(closeButtonElement);
    // modal.appendChild(titleElement);
    // modal.appendChild(contentElement);
    // modal.appendChild(imageElement);
    // modalContainer.appendChild(modal);
    //
    // modalContainer.classList.add('is-visible');
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
