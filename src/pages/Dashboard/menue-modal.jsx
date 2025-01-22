import React from "react";

const Menu = ({ items }) => {
  return (
    <div className="dropdown-menue">
      {items.map((item, index) => (
        <button key={index} onClick={item.action}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Menu;
