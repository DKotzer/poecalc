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
        "https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/base_items.json"
      )
      .then((response) => {
        // console.log("arr0", response.data);
        setBases(response.data);
        const activeBases = Object.keys(response.data)
          .filter((key) => key.includes(guide[subGroup]))
          .reduce((obj, key) => {
            return Object.assign(obj, { [key]: response.data[key] });
          }, {});

        console.log("activeBases", activeBases);
        setCurrentBases(activeBases);
        // console.log("subGroup", subGroup);
        console.log("current bases", currentBases);
      });
  }, [subGroup]);

  useEffect(() => {
    setItemList(
      Object.entries(currentBases).map((item) => (
        <Card>
          <Card.Body>
            <Card.Title>{item[1].name}</Card.Title>
            <Card.Img
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
                <ListGroup.Item>{item[1].implicits[0]}</ListGroup.Item>
              ) : (
                ""
              )}
              {Object.keys(item[1].properties).map((key) => {
                if (typeof item[1].properties[key] == "object") {
                  return Object.keys(item[1].properties[key]).map((subKey) => {
                    console.log(
                      `${item[1].name} ${key} ${subKey} : ${item[1].properties[key][subKey]}`
                    );
                    return (
                      <div key={subKey}>
                        <div>
                          {key} {subKey} : {item[1].properties[key][subKey]}
                        </div>
                      </div>
                    );
                  });

                  // console.log(
                  //   "object found weewoo",
                  //   key,
                  //   "min",
                  //   item[1].properties[key].min
                  // );
                } else {
                  return (
                    <div key={key}>
                      <div>
                        {key} : {item[1].properties[key]}
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
    // setItemList(
    //   Object.entries(currentBases).map((item) => <li>{item.name}</li>)
    // );
    // console.log("huh", itemList);
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
      <div className='grid'>{itemList}</div>
    </div>
  );
}
