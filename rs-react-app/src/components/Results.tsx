import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import { fetchPokemonData } from "./services/pokeapi";

interface ResultsProps {
  query?: string;
}

const Results: React.FC<ResultsProps> = ({ query = "" }) => {
  const [results, setResults] = useState<{ name: string; description: string; image?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPokemonData(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setError("Покемон не найден");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="results">
      {isLoading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {results.length > 0 ? <CardList results={results} /> : <p>Ничего не найдено</p>}
    </div>
  );
};

export default Results;