import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

interface Pokemon {
  name: string;
  url: string;
}

interface ResultsProps {
  query?: string;
}

const Results: React.FC<ResultsProps> = ({ query = "" }) => {
  const { page, details } = useParams<{ page?: string; details?: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage, query]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/search/${newPage}`);
  };

  const handleItemClick = (pokemon: Pokemon) => {
    navigate(`/search/${currentPage}/details/${pokemon.name}`);
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => setSelectedPokemon(data))
      .catch(() => setSelectedPokemon(null));
  };

  const handleCloseDetails = () => {
    navigate(`/search/${currentPage}`);
    setSelectedPokemon(null);
  };

  return (
    <div className="container">
      <div className="results">
        {loading ? (
          <p className="loading">⏳ Загрузка...</p>
        ) : (
          items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="pokemon-card" onClick={() => handleItemClick(item)}>
                {item.name}
              </div>
            ))
          ) : (
            <p>Ничего не найдено</p>
          )
        )}
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

      {selectedPokemon && (
        <div className="details">
          <button className="close-btn" onClick={handleCloseDetails}>✖ Закрыть</button>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>Вес: {selectedPokemon.weight} кг</p>
          <p>Рост: {selectedPokemon.height} м</p>
        </div>
      )}
    </div>
  );
};

export default Results;