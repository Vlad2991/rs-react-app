import React, { Component } from "react";

interface Props {
  onSearch: (query: string) => void;
}

interface State {
  query: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: localStorage.getItem("searchQuery") || "" };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    this.props.onSearch(trimmedQuery);
    localStorage.setItem("searchQuery", trimmedQuery);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Введите запрос..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;