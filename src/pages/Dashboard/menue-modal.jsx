import React from "react";

const Menu = ({ items }) => {
  return (
    <div className="dropdown-menue">
      {items.map((item, index) => (
        <button key={index} onClick={item.action} className="menu-item">
          <i className={item.icon} style={{ marginRight: "8px" }}></i>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Menu;
