"use client";

import React, { useState } from "react";
import FilterItem from "./filter-item";
import classNames from "classnames";

const FILTERS = [
  {
    title: "Todos",
  },
  {
    title: "Nike",
  },
  {
    title: "Adidas",
  },
  {
    title: "Puma",
  },

  {
    title: "Reebok",
  },
  {
    title: "Converse",
  },
  {
    title: "New Balance",
  },
];

export function Filters({ className }: { className?: string }) {
  const [isActive, setIsActive] = useState("Todos");

  const handleClick = (title: string) => {
    setIsActive(title);
  };

  return (
    <ul className={classNames("flex space-x-5", className)}>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.title}
          filter={filter}
          isActive={isActive}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
}
