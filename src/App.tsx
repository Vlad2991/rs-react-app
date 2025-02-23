import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './ThemeContext';
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import "./App.css";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Router>
            <div className="app">
              <h1>Поиск покемонов</h1>
              <SearchBar onSearch={handleSearch} />
              <Routes>
                <Route path="/" element={<Results query={query} />} />
                <Route path="/search/:page" element={<Results query={query} />} />
                <Route
                  path="/search/:page/details/:details"
                  element={<Results query={query} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;