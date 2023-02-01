import { useState, useEffect } from "react";

export default function SubBaseSelector({
  baseGroup,
  subGroup,
  setSubGroup,
  setSubtitle,
}) {
  //   useEffect(() => {
  //   }, []);

  let Jewellery = ["Amulet", "Belt", "Ring"];

  let BodyArmors = [
    "Body Armor (DEX)",
    "Body Armor (INT)",
    "Body Armor (STR)",
    "Body Armor (DEX/INT)",
    "Body Armor (STR/DEX)",
    "Body Armor (STR/INT)",
    "Body Armor (STR/DEX/INT)",
  ];

  let Boots = [
    "Boots (DEX)",
    "Boots (INT)",
    "Boots (STR)",
    "Boots (DEX/INT)",
    "Boots (STR/DEX)",
    "Boots (STR/INT)",
    "Boots (Ward)",
  ];

  let Gloves = [
    "Gloves (DEX)",
    "Gloves (INT)",
    "Gloves (STR)",
    "Gloves (DEX/INT)",
    "Gloves (STR/DEX)",
    "Gloves (STR/INT)",
    "Gloves (Ward)",
  ];

  let Helmets = [
    "Helmets (DEX)",
    "Helmets (INT)",
    "Helmets (STR)",
    "Helmets (DEX/INT)",
    "Helmets (STR/DEX)",
    "Helmets (STR/INT)",
    "Helmets (Ward)",
  ];

  let Offhands = [
    "Quiver",
    "Shield (DEX)",
    "Shield (INT)",
    "Shield (STR)",
    "Shield (DEX/INT)",
    "Shield (STR/DEX)",
    "Shield (STR/INT)",
  ];

  let OneHandedWeapons = [
    "Claw",
    "Dagger",
    "One Hand Axe",
    "One Hand Mace",
    "One Hand Sword",
    "Sceptre",
    "Rapier",
    "Wand",
  ];

  let TwoHandedWeapons = [
    "Bow",
    "Staff",
    "Two Hand Axe",
    "Two Hand Mace",
    "Two Hand Sword",
    "Warstaff",
  ];

  let Jewels = [
    "Cobalt Jewel",
    "Crimson Jewel",
    "Ghastly Eye Jewel",
    "Hypnotic Eye Jewel",
    "Murderous Eye Jewel",
    "Prismatic Jewel",
    "Searching Eye Jewel",
    "Timeless Jewel",
    "Viridian Jewel",
  ];

  let Flasks = ["Hybrid Flask", "Life Flask", "Mana Flask", "Utility Flask"];

  function subGroupHelper(category) {
    console.log("subgroup input detected");
    setSubGroup(category);
  }

  function getBase() {
    return baseGroup;
  }

  let list = eval(baseGroup.replace(/\s+/g, "")).map((category) => (
    <li
      key={category}
      className={
        category === subGroup
          ? "active baseSelectorButton"
          : "baseSelectorButton"
      }
      onClick={() => subGroupHelper(category)}
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
