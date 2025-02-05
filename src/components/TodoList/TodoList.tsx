"use client";

import React, { ComponentPropsWithoutRef, useRef, useState } from "react";

const initItems: { type: ItemType; name: string }[] = [
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

type ItemType = "List" | "Fruit" | "Vegetable";

const TodoList = () => {
  const [items, setItems] = useState<{ [key in ItemType]: typeof initItems }>({
    List: initItems,
    Fruit: [],
    Vegetable: [],
  });

  const timers = useRef<{ [key in string]: NodeJS.Timeout }>({});

  const handleClickItem = (type: ItemType, name: string, currentType: ItemType) => {
    const toType: ItemType = currentType === "List" ? type : "List";
    setItems((prev) => ({
      ...prev,
      [currentType]: prev[currentType].filter((item) => item.name !== name),
      [toType]: [...prev[toType], { type, name }],
    }));

    if (currentType === "List") {
      timers.current[name] = setTimeout(() => {
        setItems((prev) => ({
          ...prev,
          [toType]: prev[toType].filter((item) => item.name !== name),
          List: [...prev.List, { type, name }],
        }));
      }, 5000);
    } else {
      clearTimeout(timers.current[name]);
      delete timers.current[name];
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-4 ">
      <h1 className="text-2xl mb-4">Auto Delete Todo List</h1>
      <div className="flex flex-wrap gap-4 justify-center w-full">
        <Column
          data-testid="list-column"
          headerTitle="Todo List"
          currentType="List"
          items={items.List}
          onClickItem={handleClickItem}
        />
        <Column
          data-testid="fruit-column"
          headerTitle="Fruit"
          currentType="Fruit"
          items={items.Fruit}
          onClickItem={handleClickItem}
        />
        <Column
          data-testid="vegetable-column"
          headerTitle="Vegetable"
          currentType="Vegetable"
          items={items.Vegetable}
          onClickItem={handleClickItem}
        />
      </div>
    </div>
  );
};

type Props = {
  headerTitle: string;
  items: typeof initItems;
  onClickItem: (type: ItemType, name: string, currentType: ItemType) => void;
  currentType: ItemType;
} & ComponentPropsWithoutRef<"div">;

const Column = ({
  headerTitle,
  items,
  className = "",
  onClickItem,
  currentType,
  ...props
}: Props) => {
  return (
    <div className={`border rounded-lg max-w-36 w-full ${className}`} {...props}>
      <h2 className="text-xl bg-slate-200 p-1">{headerTitle}</h2>
      <ul className="p-1 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.name}>
            <button type="button" onClick={() => onClickItem(item.type, item.name, currentType)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
