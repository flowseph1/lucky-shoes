import React from "react";
import NavbarItem from "./NavbarItem";

const NAVBAR_ITEMS = [
  {
    title: "Inicio",
  },
  {
    title: "Marcas",
  },
  {
    title: "Sneakers",
  },
];

const Navbar = () => {
  return (
    <ul className="flex h-full items-center space-x-10 text-text-light">
      {NAVBAR_ITEMS.map((item) => (
        <NavbarItem key={item.title} item={item} />
      ))}
    </ul>
  );
};

export default Navbar;
