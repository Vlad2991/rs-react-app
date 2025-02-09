import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "./CardList";  // Путь к компоненту CardList

describe("CardList Component", () => {
  // Тест 1: Проверка, что отображается нужное количество карточек
  test("отображает указанное количество карточек", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" },
      { name: "Card 3", description: "Description 3" }
    ];

    render(<CardList results={mockResults} />);
    
    // Проверяем, что на экране отображается нужное количество карточек
    const cards = screen.getAllByText(/Description/);  // Ищем элементы с текстом "Description"
    expect(cards.length).toBe(mockResults.length);  // Должно быть столько карточек, сколько в mockResults
  });

  // Тест 2: Проверка сообщения при отсутствии карточек
  test("отображает сообщение при отсутствии карт", () => {
    render(<CardList results={[]} />);
    
    // Проверяем, что появляется сообщение, когда нет карт
    expect(screen.getByText("No cards available")).toBeInTheDocument();
  });

  // Тест 3: Проверка отображения данных каждой карточки
  test("отображает название и описание каждой карточки", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" },
      { name: "Card 3", description: "Description 3" }
    ];

    render(<CardList results={mockResults} />);
    
    // Для каждой карточки проверяем наличие названия и описания
    mockResults.forEach(result => {
      expect(screen.getByText(result.name)).toBeInTheDocument();  // Проверка имени карточки
      expect(screen.getByText(result.description)).toBeInTheDocument();  // Проверка описания
    });
  });

  // Тест 4: Проверка на то, что каждая карточка отображается с использованием компонента Card
  test("каждая карточка отображается как компонент Card", () => {
    const mockResults = [
      { name: "Card 1", description: "Description 1" },
      { name: "Card 2", description: "Description 2" }
    ];

    render(<CardList results={mockResults} />);
    
    // Проверяем, что на странице есть элементы с именами карточек
    mockResults.forEach(result => {
      expect(screen.getByText(result.name)).toBeInTheDocument();
      expect(screen.getByText(result.description)).toBeInTheDocument();
    });
  });
});