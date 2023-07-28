import styles from "../page.module.css";
import { useState } from "react";

const RouteCompressed = (props) => {
  const [filter, setFilter] = useState("");
  const { lineColor, duration, leg, legIndex } = props;

  const handleViewStops = (e) => {
    setFilter(e);
  };

  return filter === legIndex ? (
    //Uncompressed view of the Stations using Terniary State filter (legIndex =Prop)
    <div>
      <div className={styles.close_staion_list}>
        <span>
          {duration}
          &nbsp;mins
        </span>
        <span onClick={() => handleViewStops(null)}>Hide Stops</span>
      </div>
      {leg.path.stopPoints.map((stop, stopIndex) => (
        <div
          key={stopIndex}
          className={styles.station_list}
          style={{
            height: "2.9rem",
            borderColor: lineColor,
          }}
        >
          <span>
            - {stop.name.replace(/Underground Station|Rail Station/g, "")}
          </span>
        </div>
      ))}
    </div>
  ) : (
    // Compressed view of the Stations
    <div
      style={{
        height: "5.5rem",
        borderColor: lineColor,
      }}
      className={styles.journey_map_line}
    >
      <div>
        &nbsp;&nbsp;{duration}
        &nbsp;mins
      </div>

      <span onClick={() => handleViewStops(legIndex)}>view stops</span>
    </div>
  );
};

export default RouteCompressed;
