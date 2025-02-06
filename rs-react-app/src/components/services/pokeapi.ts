const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonData = async (query?: string) => {
  const url = query ? `${API_URL}/${query.toLowerCase()}` : `${API_URL}?limit=10`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }

  const data = await response.json();

  if (query) {
    // Если ищем конкретного покемона
    return [
      {
        name: data.name,
        description: `Вес: ${data.weight}, Рост: ${data.height}`,
        image: data.sprites.front_default,
      },
    ];
  } else {
    // Если получаем список покемонов
    const results = await Promise.all(
      data.results.map(async (item: { name: string; url: string }) => {
        const response = await fetch(item.url);
        const pokemonData = await response.json();
        return {
          name: item.name,
          description: `Вес: ${pokemonData.weight}, Рост: ${pokemonData.height}`,
          image: pokemonData.sprites.front_default,
        };
      })
    );
    return results;
  }
};