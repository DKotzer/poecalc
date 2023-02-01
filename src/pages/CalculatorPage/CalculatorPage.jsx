import { useState, useEffect } from "react";
import BaseGroupSelector from "../../components/BaseGroupSelector";
import SubBaseSelector from "../../components/SubBaseSelector";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

export default function CalculatorPage() {
  const [baseGroup, setBaseGroup] = useState("");
  const [baseItem, setBaseItem] = useState("");
  const [itemLevel, setItemLevel] = useState("85");
  const [subtitle, setSubtitle] = useState("Choose base group");
  const [bases, setBases] = useState({});
  const [subGroup, setSubGroup] = useState("");
  const [currentBases, setCurrentBases] = useState({});
  const [itemList, setItemList] = useState(["beep"]);
  const [modsList, setModsList] = useState({});
  const [activeItem, setActiveItem] = useState(null);

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
        setModsList(response.data);
      });
    axios
      .get(
        "https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/base_items.json"
      )
      .then((response) => {
        setBases(response.data);
      });

    console.log("mods list", modsList);
  }, []);

  useEffect(() => {
    const activeBases = Object.keys(bases)
      .filter((key) => key.includes(guide[subGroup]))
      .reduce((obj, key) => {
        return Object.assign(obj, { [key]: bases[key] });
      }, {});

    console.log("activeBases", activeBases);
    setCurrentBases(activeBases);
  }, [subGroup]);

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
                    ? modsList[item[1].implicits[0]].stats[0].id.replace(/_/g, " ")
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

                  //might need to go back to the way below if we run in to errors with uniques, above way seems to work for all bases other than health flasks
                  // return Object.keys(item[1].properties[key]).map((subKey) => {
                  //   return (
                  //     <div key={subKey}>
                  //       <div>
                  //         {key} {subKey} : {item[1].properties[key][subKey]}
                  //       </div>
                  //     </div>
                  //   );
                  // });
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
      {activeItem ? activeItem.name : ""}
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
        <Card className='selectedCard'>
          <Card.Body>
            <Card.Title
              className='cardTitle'
              onClick={() => setActiveItem(activeItem)}
            >
              {activeItem.name}
            </Card.Title>
            <Card.Img
              onClick={() => setActiveItem(activeItem)}
              style={{ height: "auto" }}
              variant='top'
              src={`${imgUrlBase}${activeItem.visual_identity.dds_file.replace(
                ".dds",
                ".png"
              )}`}
              className='cardIMG'
            />
            {/* <Card.Text>Something</Card.Text> */}
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>Level: {activeItem.drop_level}</ListGroup.Item>

              {activeItem.implicits[0] ? (
                <ListGroup.Item>
                  {modsList[activeItem.implicits[0]].stats[0].id
                    ? modsList[activeItem.implicits[0]].stats[0].id
                    : ""}{" "}
                  {modsList[activeItem.implicits[0]].stats[0].min
                    ? modsList[activeItem.implicits[0]].stats[0].min
                    : ""}
                  -
                  {modsList[activeItem.implicits[0]].stats[0].max
                    ? modsList[activeItem.implicits[0]].stats[0].max
                    : ""}
                </ListGroup.Item>
              ) : (
                ""
              )}
              {Object.keys(activeItem.properties).map((key) => {
                if (typeof activeItem.properties[key] == "object") {
                  //had to add this return up here to get it to work, if the key is an object, break down the object and display the key, subkey: value, else just display the key/value
                  return Object.keys(activeItem.properties[key]).map(
                    (subKey) => {
                      // console.log(
                      //   `${activeItem.name} ${key} ${subKey} : ${activeItem.properties[key][subKey]}`
                      // );
                      return (
                        <div key={subKey}>
                          <div>
                            {key} {subKey} :{" "}
                            {activeItem.properties[key][subKey]}
                          </div>
                        </div>
                      );
                    }
                  );

                  // console.log(
                  //   "object found weewoo",
                  //   key,
                  //   "min",
                  //   activeItem.properties[key].min
                  // );
                } else {
                  return (
                    <div key={key}>
                      <div>
                        {key} : {activeItem.properties[key]}
                      </div>
                      <div></div>
                    </div>
                  );
                }
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
      <div className='grid'>{itemList}</div>
    </div>
  );
}
