import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const App: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Поиск покемонов</h1>
        <div className="main-container">
          <SearchBar onSearch={handleSearch} />
          <Results query={query} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;