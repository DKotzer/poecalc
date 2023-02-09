import { useState, useEffect } from "react";
import axios from "axios";
import BaseGroupSelector from "../../components/BaseGroupSelector";
import SubBaseSelector from "../../components/SubBaseSelector";
import ActiveArea from "../../components/ActiveArea";
import { Card, ListGroup } from "react-bootstrap";

export default function CalculatorPage() {
  const [baseGroup, setBaseGroup] = useState("");
  const [subtitle, setSubtitle] = useState("Choose base group");
  const [bases, setBases] = useState({});
  const [subGroup, setSubGroup] = useState("");
  const [currentBases, setCurrentBases] = useState({});
  const [itemList, setItemList] = useState(["beep"]);
  const [modsList, setModsList] = useState({});
  const [shortModsList, setShortModsList] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemMods, setActiveItemMods] = useState([]);
  const [activeItemModTypes, setActiveItemModTypes] = useState([]);
  const [activePrefixes, setActivePrefixes] = useState([]);
  const [activeSuffixes, setActiveSuffixes] = useState([]);

  const imgUrlBase = "https://web.poecdn.com/image/";

  const guide = {
    "Body Armors": "Body",
    "Boots": "Boots",
    "Flasks": "Flask",
    "Gloves": "Gloves",
    "Helmets": "Helmet",
    "Jewellery": "Amulet",
    "Jewels": "Jewel",
    "Offhands": "Shield",
    "One Handed Weapons": "OneHand",
    "Two Handed Weapons": "TwoHand",

    "Cobalt Jewel": "JewelInt",
    "Crimson Jewel": "JewelStr",
    "Ghastly Eye Jewel": "JewelAbyssSummoner",
    "Hypnotic Eye Jewel": "JewelAbyssCaster",
    "Murderous Eye Jewel": "JewelAbyssMelee",
    "Prismatic Jewel": "JewelPrismatic",
    "Searching Eye Jewel": "JewelAbyssRanged",
    "Timeless Jewel": "JewelTimeless",
    "Viridian Jewel": "JewelDex",

    "Hybrid Flask": "FlaskHybrid",
    "Iron Flask": "FlaskIron",
    "Life Flask": "FlaskLife",
    "Mana Flask": "FlaskMana",
    "Utility Flask": "FlaskUtility",

    "Amulet": "Amulet",
    "Belt": "Belt",
    "Ring": "Ring",
    "Unset Ring": "UnsetRing",

    "Body Armor (DEX)": "BodyDex",
    "Body Armor (INT)": "BodyInt",
    "Body Armor (STR)": "BodyStr",
    "Body Armor (DEX/INT)": "BodyDexInt",
    "Body Armor (STR/DEX)": "BodyStrDex",
    "Body Armor (STR/INT)": "BodyStrInt",
    "Body Armor (STR/DEX/INT)": "BodyStrDexInt",

    "Boots (DEX)": "BootsDex",
    "Boots (INT)": "BootsInt",
    "Boots (STR)": "BootsStr",
    "Boots (DEX/INT)": "BootsDexInt",
    "Boots (STR/DEX)": "BootsStrDex",
    "Boots (STR/INT)": "BootsStrInt",
    "Boots (Ward)": "BootsExpedition",

    "Gloves (DEX)": "GlovesDex",
    "Gloves (INT)": "GlovesInt",
    "Gloves (STR)": "GlovesStr",
    "Gloves (DEX/INT)": "GlovesDexInt",
    "Gloves (STR/DEX)": "GlovesStrDex",
    "Gloves (STR/INT)": "GlovesStrInt",
    "Gloves (Ward)": "GlovesExpedition",

    "Helmets (DEX)": "HelmetDex",
    "Helmets (INT)": "HelmetInt",
    "Helmets (STR)": "HelmetStr",
    "Helmets (DEX/INT)": "HelmetDexInt",
    "Helmets (STR/DEX)": "HelmetStrDex",
    "Helmets (STR/INT)": "HelmetStrInt",
    "Helmets (Ward)": "HelmetExpedition",

    "Quiver": "Quiver",
    "Shield (DEX)": "ShieldDex",
    "Shield (INT)": "ShieldInt",
    "Shield (STR)": "ShieldStr",
    "Shield (DEX/INT)": "ShieldDexInt",
    "Shield (STR/DEX)": "ShieldStrDex",
    "Shield (STR/INT)": "ShieldStrInt",
    "Shield (Ward)": "ShieldExpedition",

    "Claw": "Claw",
    "Dagger": "Dagger",
    "One Hand Axe": "OneHandAxe",
    "One Hand Mace": "OneHandMace",
    "One Hand Sword": "OneHandSword",
    "Rune Dagger": "RuneDagger",
    "Sceptre": "Sceptre",
    "Rapier": "Rapier",
    "Wand": "Wand",

    "Bow": "Bow",
    "Staff": "Staff",
    "Two Hand Axe": "TwoHandAxe",
    "Two Hand Mace": "TwoHandMace",
    "Two Hand Sword": "TwoHandSword",
    "Warstaff": "Warstaff",
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/mods.json"
      )
      .then((response) => {
        //want to set it to tempHolder instead but tempHolder is coming back as empty, need to fix the filter
        setModsList(response.data);
        // console.log("modsList initial", response.data);
        setShortModsList(
          Object.entries(response.data)
            .filter(
              ([_, mod]) =>
                mod.generation_type === "suffix" ||
                mod.generation_type === "prefix" ||
                mod.generation_type === "implicit"
            )
            .reduce((obj, [id, mod]) => {
              return Object.assign(obj, { [id]: mod });
            }, {})
        );
      });
    axios
      .get(
        "https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/base_items.json"
      )
      .then((response) => {
        setBases(response.data);
      });
  }, []);

  useEffect(() => {
    // console.log("short mods list", shortModsList);
    const activeBases = Object.keys(bases)
      .filter((key) => key.includes(guide[subGroup]))
      .reduce((obj, key) => {
        return Object.assign(obj, { [key]: bases[key] });
      }, {});

    console.log("activeBases", activeBases);
    setCurrentBases(activeBases);
    console.log("activeItem", activeItem);
    // console.log("mods list", modsList);
  }, [subGroup]);

  useEffect(() => {
    if (activeItem != null) {
      // let activeTags = [];
      // for (let i = 0; i < activeItem.tags.length; i++) {
      //   activeTags.push(activeItem.tags[i]);
      // }
      let activeTags = activeItem.tags;
      console.log("active tags", activeTags);
      let activeMods = Object.values(shortModsList).filter((mod) => {
        return mod.spawn_weights.some((weight) => {
          return (
            activeTags.includes(weight.tag) &&
            weight.weight > 0 &&
            mod.domain === "item" &&
            ["suffix", "prefix", "implicit"].includes(mod.generation_type)
          );
        });
      });
      let modTypes = [];
      let modsLength = Object.keys(shortModsList).length;

      if (modsLength > 0) {
        const filteredMods = activeMods.filter((mod) => {
          for (let i = 0; i < mod.spawn_weights.length; i++) {
            if (
              activeTags.includes(mod.spawn_weights[i].tag) &&
              mod.spawn_weights[i].weight > 0 &&
              mod.domain === "item" &&
              ["suffix", "prefix", "implicit"].includes(mod.generation_type)
            ) {
              return true;
            }
          }
          return false;
        });
        const filteredPrefixes = filteredMods.filter((mod) => {
          for (let i = 0; i < mod.spawn_weights.length; i++) {
            if (
              activeTags.includes(mod.spawn_weights[i].tag) &&
              mod.spawn_weights[i].weight > 0 &&
              mod.domain === "item" &&
              ["prefix"].includes(mod.generation_type)
            ) {
              return true;
            }
          }

          return false;
        });
        const filteredSuffixes = filteredMods.filter((mod) => {
          for (let i = 0; i < mod.spawn_weights.length; i++) {
            if (
              activeTags.includes(mod.spawn_weights[i].tag) &&
              mod.spawn_weights[i].weight > 0 &&
              mod.domain === "item" &&
              ["suffix"].includes(mod.generation_type)
            ) {
              return true;
            }
          }

          return false;
        });
        const filteredImplicits = filteredMods.filter((mod) => {
          for (let i = 0; i < mod.spawn_weights.length; i++) {
            if (
              activeTags.includes(mod.spawn_weights[i].tag) &&
              mod.spawn_weights[i].weight > 0 &&
              mod.domain === "item" &&
              ["implicit"].includes(mod.generation_type)
            ) {
              return true;
            }
          }

          return false;
        });
        // console.log("active implicits", filteredImplicits);
        // console.log("active suffixes", filteredSuffixes);
        // console.log("active prefixes", filteredPrefixes);
        // console.log("active Mods", filteredMods);
        setActiveItemMods(filteredMods);
        modTypes = [...new Set(filteredMods.map((mod) => mod.type))];
        //go back to this way if new way doesn't work, and change mod.type.replace to mod.replace for ActiveArea.jsx in the maps
        // setActivePrefixes([
        //   ...new Set(filteredPrefixes.map((mod) => mod.type)),
        // ]);
        // setActiveSuffixes([
        //   ...new Set(filteredSuffixes.map((mod) => mod.type)),
        // ]);
        setActivePrefixes(filteredPrefixes);
        setActiveSuffixes(filteredSuffixes);
      } else {
        console.log("short mods list length = 0");
      }
      //old way of doing it, took 1000x longer
      // for (let j = 0; j < modsLength; j++) {
      //   for (
      //     let z = 0;
      //     z < Object.values(shortModsList)[j].spawn_weights.length;
      //     z++
      //   ) {
      //     if (
      //       activeTags.includes(
      //         Object.values(shortModsList)[j].spawn_weights[z].tag
      //       ) &&
      //       Object.values(shortModsList)[j].spawn_weights[z].weight > 0 &&
      //       Object.values(shortModsList)[j].domain == "item" &&
      //       ["suffix", "prefix", "implicit"].includes(
      //         Object.values(shortModsList)[j].generation_type
      //       )
      //     ) {
      //       // activeMods.push(Object.values(shortModsList)[j]);
      //       let compareString = Object.values(shortModsList)[j].type;
      //       if (modTypes.includes(compareString)) {
      //         // console.log("already found");
      //       } else {
      //         // console.log('else', Object.values(shortModsList)[j].type);
      //         modTypes.push(Object.values(shortModsList)[j].type);
      //         // console.log("modTypes", modTypes);
      //         // console.log(modTypes.includes(compareString));
      //       }
      //     }
      //   }
      // }
      setActiveItemModTypes(modTypes);

      // console.log("modTypes", modTypes);
      // console.log("active item mods", activeItemMods);
    }
  }, [activeItem]);

  useEffect(() => {
    setItemList(
      Object.entries(currentBases).map((item) => (
        <Card className='itemCard'>
          <Card.Body>
            <Card.Title
              className='cardTitle'
              onClick={() => setActiveItem(item[1])}
            >
              {item[1].name}
            </Card.Title>
            <Card.Img
              onClick={() => setActiveItem(item[1])}
              style={{ height: "auto" }}
              variant='top'
              src={`${imgUrlBase}${item[1].visual_identity.dds_file.replace(
                ".dds",
                ".png"
              )}`}
              className='cardIMG'
            />
            {/* <Card.Text>Something</Card.Text> */}
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>Level: {item[1].drop_level}</ListGroup.Item>
              {item[1].implicits[0] ? (
                <ListGroup.Item>
                  {modsList[item[1].implicits[0]].stats[0].id
                    ? modsList[item[1].implicits[0]].stats[0].id
                        .replace(/_/g, " ")
                        .replace(/(?:^|\s|[-"'([{])+\S/g, (c) =>
                          c.toUpperCase()
                        )
                    : ""}{" "}
                  {modsList[item[1].implicits[0]].stats[0].min
                    ? modsList[item[1].implicits[0]].stats[0].min
                    : ""}
                  -
                  {modsList[item[1].implicits[0]].stats[0].max
                    ? modsList[item[1].implicits[0]].stats[0].max
                    : ""}
                </ListGroup.Item>
              ) : (
                ""
              )}
              {Object.keys(item[1].properties).map((key) => {
                if (typeof item[1].properties[key] == "object") {
                  return (
                    <div>
                      <div>
                        {key
                          .replace(/_/g, " ")
                          .replace(/(?:^|\s|[-"'([{])+\S/g, (c) =>
                            c.toUpperCase()
                          )}
                        : {item[1].properties[key].min} -{" "}
                        {item[1].properties[key].max}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={key}>
                      <div>
                        {key
                          .replace(/_/g, " ")
                          .replace(/(?:^|\s|[-"'([{])+\S/g, (c) =>
                            c.toUpperCase()
                          )}{" "}
                        : {item[1].properties[key]}
                      </div>
                      <div></div>
                    </div>
                  );
                }
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      ))
    );
  }, [currentBases]);

  return (
    <div>
      <h1>Calculator</h1>
      <h2>{subtitle === "Choose base group" ? subtitle : ""}</h2>

      <BaseGroupSelector
        baseGroup={baseGroup}
        setBaseGroup={setBaseGroup}
        setSubtitle={setSubtitle}
      />

      {baseGroup !== "" ? (
        <SubBaseSelector
          baseGroup={baseGroup}
          subGroup={subGroup}
          setSubGroup={setSubGroup}
          setSubtitle={setSubtitle}
        />
      ) : (
        ""
      )}
      {activeItem ? (
        <ActiveArea
          modsList={modsList}
          setActiveItem={setActiveItem}
          activeItemModTypes={activeItemModTypes}
          activeItem={activeItem}
          activePrefixes={activePrefixes}
          activeSuffixes={activeSuffixes}
        />
      ) : (
        ""
      )}
      <div className='grid'>{itemList}</div>
    </div>
  );
}
