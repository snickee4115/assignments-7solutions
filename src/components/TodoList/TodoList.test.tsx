import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";

describe("TodoList", () => {
  beforeEach(() => {
    render(<TodoList />);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const testUtils = () => {
    const listColumn = screen.getByTestId("list-column");
    const getLastItemInListColumn = () => {
      const items = within(screen.getByTestId("list-column")).queryAllByRole("button");
      return items[items.length - 1];
    };

    // count items in column
    const getItemsCount = (columnTestId: string) => {
      const column = screen.getByTestId(columnTestId).querySelectorAll("li");
      return column.length;
    };

    const getColumnTestId = (type: "List" | "Fruit" | "Vegetable") => {
      switch (type) {
        case "List":
          return "list-column";
        case "Fruit":
          return "fruit-column";
        case "Vegetable":
          return "vegetable-column";
      }
    };

    return { listColumn, getLastItemInListColumn, getItemsCount, getColumnTestId };
  };

  it("should render TodoList columns and items correctly", () => {
    expect(screen.getByRole("heading", { level: 1, name: "Auto Delete Todo List" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Todo List" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Fruit" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 2, name: "Vegetable" })).toBeDefined();

    const listColumn = screen.getByTestId("list-column");
    expect(within(listColumn).getByText("Apple")).toBeDefined();
    expect(within(listColumn).getByText("Broccoli")).toBeDefined();
  });

  it("should move item to right columns and returns after 5 seconds when clicked item from Todo List column", async () => {
    const { listColumn, getLastItemInListColumn, getItemsCount, getColumnTestId } = testUtils();

    const initialListCount = getItemsCount("list-column");

    const clickAndTestItem = async (itemName: string, type: "List" | "Fruit" | "Vegetable") => {
      const columnTestId = getColumnTestId(type);
      const listColumnTestId = getColumnTestId("List");
      const initialItemsCount = getItemsCount(columnTestId); // count items in the target column before the click

      const itemBtn = screen.getByRole("button", { name: itemName });
      fireEvent.click(itemBtn);

      expect(getItemsCount(columnTestId)).toBe(initialItemsCount + 1); // target column should +1
      expect(getItemsCount(listColumnTestId)).toBe(initialListCount - 1); // list column should -1

      // check item in the correct column
      const column = screen.getByTestId(columnTestId);
      expect(column).toHaveTextContent(itemName);
      expect(listColumn).not.toHaveTextContent(itemName);

      await act(async () => {
        vi.advanceTimersByTime(5000);
      });

      // amount of items should restore
      expect(getItemsCount(columnTestId)).toBe(initialItemsCount);
      expect(getItemsCount(listColumnTestId)).toBe(initialListCount);

      // check item restored in the list column
      expect(column).not.toHaveTextContent(itemName);
      expect(getLastItemInListColumn()).toHaveTextContent(itemName);
    };

    // click apple from fruit column
    await clickAndTestItem("Apple", "Fruit");

    // click broccoli from vegetable column
    await clickAndTestItem("Broccoli", "Vegetable");
  });

  it("should immediately return item to list-column when clicked item from another column", async () => {
    const { getLastItemInListColumn, getItemsCount, getColumnTestId } = testUtils();

    const initialListCount = getItemsCount("list-column");

    const clickAndTestItemImmediately = async (
      itemName: string,
      type: "List" | "Fruit" | "Vegetable"
    ) => {
      const columnTestId = getColumnTestId(type);
      const listColumnTestId = getColumnTestId("List");
      const initialItemsCount = getItemsCount(columnTestId); // count items in the target column before the click

      const itemFromListColBtn = screen.getByRole("button", { name: itemName });
      fireEvent.click(itemFromListColBtn);

      // immediately move item back to list-column
      const column = screen.getByTestId(columnTestId);
      const itemFromMovedColBtn = screen.getByRole("button", { name: itemName });
      fireEvent.click(itemFromMovedColBtn);

      // amount of items should restore
      expect(getItemsCount(columnTestId)).toBe(initialItemsCount);
      expect(getItemsCount(listColumnTestId)).toBe(initialListCount);

      // check item restored in the list column
      expect(column).not.toHaveTextContent(itemName);
      expect(getLastItemInListColumn()).toHaveTextContent(itemName);
    };

    // click apple from fruit column
    await clickAndTestItemImmediately("Apple", "Fruit");

    // click broccoli from vegetable column
    await clickAndTestItemImmediately("Broccoli", "Vegetable");
  });
});
