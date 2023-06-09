import React from "react";

interface Props {
    item: { title: string };
}

const NavbarItem = ({ item }: Props) => {
    return <li className="cursor-pointer font-semibold hover:text-text-base">{item.title}</li>;
};

export default NavbarItem;
