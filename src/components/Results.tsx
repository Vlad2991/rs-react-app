// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { addItem, removeItem, clearItems } from '../selectedItemsSlice';
// import { useTheme } from '../ThemeContext';
// import Pagination from "./Pagination";

// interface Pokemon {
//   name: string;
//   url: string;
// }

// interface ResultsProps {
//   query?: string;
// }

// const Results: React.FC<ResultsProps> = ({ query = "" }) => {
//   const { page, details } = useParams<{ page?: string; details?: string }>();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
//   const { theme, toggleTheme } = useTheme();
//   const [items, setItems] = useState<Pokemon[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
//   const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     setLoading(true);
//     fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setItems(data.results.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase())));
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [currentPage, query]);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//     navigate(`/search/${newPage}`);
//   };

//   const handleItemClick = (pokemon: Pokemon) => {
//     navigate(`/search/${currentPage}/details/${pokemon.name}`);
//     fetch(pokemon.url)
//       .then((res) => res.json())
//       .then((data) => setSelectedPokemon(data))
//       .catch(() => setSelectedPokemon(null));
//   };

//   const handleCloseDetails = () => {
//     navigate(`/search/${currentPage}`);
//     setSelectedPokemon(null);
//   };

//   const handleSelectItem = (pokemon: Pokemon) => {
//     const item = {
//       name: pokemon.name,
//       description: `Pokemon: ${pokemon.name}`,
//       url: pokemon.url,
//     };
//     dispatch(addItem(item));
//   };

//   const handleDeselectItem = (name: string) => {
//     dispatch(removeItem(name));
//   };

//   const handleClearItems = () => {
//     dispatch(clearItems());
//   };

//   const handleDownload = () => {
//     const csvContent = "data:text/csv;charset=utf-8," 
//       + selectedItems.map(item => `${item.name},${item.description},${item.url}`).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `${selectedItems.length}_pokemons.csv`);
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className={`container ${theme}`}>
//       <button onClick={toggleTheme}>Toggle Theme</button>
//       <div className="results">
//         {loading ? (
//           <p className="loading">⏳ Загрузка...</p>
//         ) : (
//           items.length > 0 ? (
//             items.map((item, index) => (
//               <div key={index} className="pokemon-card" onClick={() => handleItemClick(item)}>
//                 {item.name}
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.some(selected => selected.name === item.name)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       handleSelectItem(item);
//                     } else {
//                       handleDeselectItem(item.name);
//                     }
//                   }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p>Ничего не найдено</p>
//           )
//         )}
//         <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
//       </div>

//       {selectedPokemon && (
//         <div className="details">
//           <button className="close-btn" onClick={handleCloseDetails}>✖ Закрыть</button>
//           <h2>{selectedPokemon.name}</h2>
//           <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
//           <p>Вес: {selectedPokemon.weight} кг</p>
//           <p>Рост: {selectedPokemon.height} м</p>
//         </div>
//       )}

//       {selectedItems.length > 0 && (
//         <div className="floating-menu">
//           <p>Выбрано {selectedItems.length} элементов</p>
//           <button onClick={handleClearItems}>Отменить выбор всех</button>
//           <button onClick={handleDownload}>Загрузить</button>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearItems } from '../selectedItemsSlice';
import { useTheme } from '../ThemeContext';
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
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
  const { theme, toggleTheme } = useTheme();
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

  const handleSelectItem = (pokemon: Pokemon) => {
    const item = {
      name: pokemon.name,
      description: `Pokemon: ${pokemon.name}`,
      url: pokemon.url,
    };
    dispatch(addItem(item));
  };

  const handleDeselectItem = (name: string) => {
    dispatch(removeItem(name));
  };

  const handleClearItems = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + selectedItems.map(item => `${item.name},${item.description},${item.url}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedItems.length}_pokemons.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={`container ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="results">
        {loading ? (
          <p className="loading">⏳ Загрузка...</p>
        ) : (
          items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="pokemon-card" onClick={() => handleItemClick(item)}>
                <h3>{item.name}</h3>
                <input
                  type="checkbox"
                  checked={selectedItems.some(selected => selected.name === item.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleSelectItem(item);
                    } else {
                      handleDeselectItem(item.name);
                    }
                  }}
                />
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

      {selectedItems.length > 0 && (
        <div className="floating-menu">
          <p>Выбрано {selectedItems.length} элементов</p>
          <button onClick={handleClearItems}>Отменить выбор всех</button>
          <button onClick={handleDownload}>Загрузить</button>
        </div>
      )}
    </div>
  );
};

export default Results;