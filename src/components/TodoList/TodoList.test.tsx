import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("should render TodoList columns and items correctly", () => {
    render(<TodoList />);
    expect(screen.getByRole("heading", { level: 1, name: "Auto Delete Todo List" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Todo List" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Fruit" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Vegetable" })).toBeDefined();

    const listColumn = screen.getByTestId("list-column");
    expect(within(listColumn).getByText("Apple")).toBeDefined();
    expect(within(listColumn).getByText("Broccoli")).toBeDefined();
  });
});
