import React from "react";

interface CardProps {
  name: string;
  description: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ name, description, image }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={name} className="card-image" />}
      <h3 className="card-title">{name}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;