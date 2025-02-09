import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "./CardList"; 

describe("CardList Component", () => {

  test("отображает указанное количество карточек", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" },
      { name: "Card 3", description: "Description 3" }
    ];

    render(<CardList results={mockResults} />);
    
  
    const cards = screen.getAllByText(/Description/);  
    expect(cards.length).toBe(mockResults.length);  
  });

  
  test("отображает сообщение при отсутствии карт", () => {
    render(<CardList results={[]} />);
    
   
    expect(screen.getByText("No cards available")).toBeInTheDocument();
  });

  
  test("отображает название и описание каждой карточки", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" },
      { name: "Card 3", description: "Description 3" }
    ];

    render(<CardList results={mockResults} />);
    
 
    mockResults.forEach(result => {
      expect(screen.getByText(result.name)).toBeInTheDocument();  
      expect(screen.getByText(result.description)).toBeInTheDocument();  
    });
  });


  test("каждая карточка отображается как компонент Card", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" }
    ];

    render(<CardList results={mockResults} />);
    
    
    mockResults.forEach(result => {
      expect(screen.getByText(result.name)).toBeInTheDocument();
      expect(screen.getByText(result.description)).toBeInTheDocument();
    });
  });
});