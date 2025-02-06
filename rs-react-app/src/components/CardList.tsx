import React from "react";
import Card from "./Card";

interface CardListProps {
  results: { name: string; description: string; image?: string }[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
  return (
    <div className="card-list">
      {results.map((item, index) => (
        <Card key={index} name={item.name} description={item.description} image={item.image} />
      ))}
    </div>
  );
};

export default CardList;