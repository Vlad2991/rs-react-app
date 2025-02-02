import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

interface State {
  results: { name: string; description: string }[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
  }

  fetchData = async (query: string = "") => {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await fetch(query ? `${API_URL}&search=${query}` : API_URL);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results.map((item: { name: string }) => ({
        name: item.name,
        description: "Описание недоступно",
      }));

      this.setState({ results });
    } catch (error) {
      this.setState({ error: error instanceof Error ? error.message : "Неизвестная ошибка" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchData(localStorage.getItem("searchQuery") || "");
  }

  handleSearch = (query: string) => {
    this.fetchData(query);
  };

  triggerError = () => {
    throw new Error("Тестовая ошибка!");
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <h1>Поиск</h1>
          <SearchBar onSearch={this.handleSearch} />
          <Results results={this.state.results} isLoading={this.state.isLoading} error={this.state.error} />
          <button onClick={this.triggerError} className="error-button">
            Вызвать ошибку
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;