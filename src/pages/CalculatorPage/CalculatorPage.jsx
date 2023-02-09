import { useState, useEffect } from "react";
import axios from "axios";
import BaseGroupSelector from "../../components/BaseGroupSelector";
import SubBaseSelector from "../../components/SubBaseSelector";
import ActiveArea from "../../components/ActiveArea";
import { Card, ListGroup } from "react-bootstrap";
import guide from "./theguide"


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

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/brather1ng/RePoE/master/RePoE/data/mods.json"
      )
      .then((response) => {
        setModsList(response.data);
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
    const activeBases = Object.keys(bases)
      .filter((key) => key.includes(guide.guide[subGroup]))
      .reduce((obj, key) => {
        return Object.assign(obj, { [key]: bases[key] });
      }, {});
    setCurrentBases(activeBases);
  }, [subGroup]);

  useEffect(() => {
    if (activeItem != null) {
      let activeMods = Object.values(shortModsList).filter((mod) => {
        return mod.spawn_weights.some((weight) => {
          return (
            activeItem.tags.includes(weight.tag) &&
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
              activeItem.tags.includes(mod.spawn_weights[i].tag) &&
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
              activeItem.tags.includes(mod.spawn_weights[i].tag) &&
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
              activeItem.tags.includes(mod.spawn_weights[i].tag) &&
              mod.spawn_weights[i].weight > 0 &&
              mod.domain === "item" &&
              ["suffix"].includes(mod.generation_type)
            ) {
              return true;
            }
          }

          return false;
        });


        
        setActiveItemMods(filteredMods);
        modTypes = [...new Set(filteredMods.map((mod) => mod.type))];
        setActivePrefixes(filteredPrefixes);
        setActiveSuffixes(filteredSuffixes);
      } else {
        console.log("short mods list length = 0");
      }
      setActiveItemModTypes(modTypes);
    }
  }, [activeItem]);

  useEffect(() => {
    setItemList(
      Object.entries(currentBases).map((item, i) => (
        <Card key={i} className='itemCard'>
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
              {Object.keys(item[1].properties).map((key, i) => {
                if (typeof item[1].properties[key] == "object") {
                  return (
                    <div key={i}>
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
          modsList={shortModsList}
          setActiveItem={setActiveItem}
          activeItemModTypes={activeItemModTypes}
          activeItem={activeItem}
          activePrefixes={activePrefixes}
          activeSuffixes={activeSuffixes}
          shortModsList={shortModsList}
        />
      ) : (
        ""
      )}
      <div className='grid'>{itemList}</div>
    </div>
  );
}
