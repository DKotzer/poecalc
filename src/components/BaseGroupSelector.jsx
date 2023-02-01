import React from "react";

export default function BaseGroupSelector({
  baseGroup,
  setBaseGroup,
  setSubtitle,
}) {
  const bases = [
    "Body Armors",
    "Boots",
    "Flasks",
    "Gloves",
    "Helmets",
    "Jewellery",
    "Jewels",
    "Offhands",
    "One Handed Weapons",
    "Two Handed Weapons",
  ];

  function setBase(category) {
    setBaseGroup(category);
    setSubtitle(category);
  }

  const list = bases.map((category) => (
    <li
      key={category}
      className={
        category === baseGroup
          ? "active baseSelectorButton"
          : "baseSelectorButton"
      }
      onClick={() => setBase(category)}
    >
      {category}
    </li>
  ));

  return (
    <div>
      <ul className='baseList'>{list}</ul>
    </div>
  );
}
