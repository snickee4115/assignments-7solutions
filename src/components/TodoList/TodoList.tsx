"use client";

import React, { ComponentPropsWithoutRef } from "react";

const initItems = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

const TodoList = () => {
  return (
    <div className="flex justify-center items-center flex-col p-4 ">
      <h1 className="text-2xl mb-4">Auto Delete Todo List</h1>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        <Column data-testid="list-column" headerTitle="Todo List" items={initItems} />
        <Column data-testid="fruit-column" headerTitle="Fruit" items={initItems} />
        <Column data-testid="vegetable-column" headerTitle="Vegetable" items={initItems} />
      </div>
    </div>
  );
};

type Props = {
  headerTitle: string;
  items: typeof initItems;
} & ComponentPropsWithoutRef<"div">;

const Column = ({ headerTitle, items, className = "", ...props }: Props) => {
  return (
    <div className={`border rounded-lg max-w-36 w-full ${className}`} {...props}>
      <h2 className="text-xl bg-slate-200 p-1">{headerTitle}</h2>
      <ul className="p-1 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.name}>
            <button>{item.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
