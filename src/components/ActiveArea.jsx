import React from "react";
import { Card, ListGroup } from "react-bootstrap";

export default function ActiveArea({
  modsList,
  setActiveItem,
  activeItemModTypes,
  activeItem,
  activePrefixes,
  activeSuffixes,
}) {
  const imgUrlBase = "https://web.poecdn.com/image/";
  return (
    <div className='activeArea'>
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
                      .replace(/_/g, " ")
                      .replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
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
                return Object.keys(activeItem.properties[key]).map((subKey) => {
                  // console.log(
                  //   `${activeItem.name} ${key} ${subKey} : ${activeItem.properties[key][subKey]}`
                  // );
                  return (
                    <div key={subKey}>
                      <div>
                        {key} {subKey} : {activeItem.properties[key][subKey]}
                      </div>
                    </div>
                  );
                });

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
      <div className='activeStatsArea'>
        {/* <div>
          <table>
            <tbody>
              <tr>
                <th>Mod Category</th>
              </tr>
              {activeItemModTypes.length > 0
                ? activeItemModTypes.map((modType) => {
                    return (
                      <tr>
                        <td>{modType}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div> */}
        <div>
          <table>
            <tbody>
              <tr>
                <th>Prefixes</th>
              </tr>
              {activePrefixes
                ? activePrefixes.map((mod) => {
                    return (
                      <tr>
                        <td>
                          {mod.type.replace(/([A-Z])/g, " $1").trim()}{" "}
                          {mod.stats[0].min}-{mod.stats[0].max}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Suffixes</th>
              </tr>
              {activeSuffixes.length > 0
                ? activeSuffixes.map((mod) => {
                    return (
                      <tr>
                        <td>
                          {mod.type.replace(/([A-Z])/g, " $1").trim()}{" "}
                          {mod.stats[0].min}-{mod.stats[0].max}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
