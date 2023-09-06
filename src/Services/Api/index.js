const pokemonAPI = async (pokemonName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  const data = await response.json();
  return data;
};

pokemonAPI("pikachu")
  .then((response) => {
    console.log("response", response);
  })
  .catch((error) => {
    console.log(error.message);
  });
