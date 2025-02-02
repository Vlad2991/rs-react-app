import React, { Component } from "react";
import Card from "./Card";

interface Props {
  results: { name: string; description: string }[];
}

class CardList extends Component<Props> {
  render() {
    return (
      <div className="results">
        {this.props.results.length > 0 ? (
          this.props.results.map((item, index) => (
            <Card key={index} name={item.name} description={item.description} />
          ))
        ) : (
          <div>Нет результатов</div>
        )}
      </div>
    );
  }
}

export default CardList;