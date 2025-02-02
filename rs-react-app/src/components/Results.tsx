import React, { Component } from "react";
import CardList from "./CardList";

interface Props {
  results: { name: string; description: string }[];
  isLoading: boolean;
  error: string | null;
}

class Results extends Component<Props> {
  render() {
    if (this.props.isLoading) {
      return <div className="loading">Загрузка...</div>;
    }

    if (this.props.error) {
      return <div className="error">Ошибка: {this.props.error}</div>;
    }

    return <CardList results={this.props.results} />;
  }
}

export default Results;