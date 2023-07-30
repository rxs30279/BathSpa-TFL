import styles from "../page.module.css";
import { useState } from "react";
// Components
import CardTwoHeader from "./journey_card_two_header";
import RouteCompressed from "./route_compressed";
// Images
import Image from "next/image";
import undergroundLogo from "./images/Underground_logo.jpeg";
// Data files
import undergroundLines from "./assets/station_colors";
import stationArray from "./assets/ICS Station Codes and addresses.json";

const JourneyChild = (props) => {
  const { journey, journeyIndex, targetFrom, targetTo } = props;

  const [expandJourney, setExpandJourney] = useState("");
  console.log("journeyIndex", journeyIndex, "expandJourney", expandJourney);
  const handleOnClick = (journeyIndex) => {
    journeyIndex === expandJourney
      ? setExpandJourney(null)
      : setExpandJourney(journeyIndex);
    console.log("journeyIndex", journeyIndex, "expandJourney", expandJourney);
  };

  //Render

  return (expandJourney === journeyIndex) | (journeyIndex === 0) ? (
    <section className={styles.container_journey}>
      {/* Second card */}
      <div className={styles.letterbox_journey_map}>
        <CardTwoHeader
          startTime={timeFormat(new Date(journey.startDateTime))}
          arrivaltTime={timeFormat(new Date(journey.arrivalDateTime))}
          duration={journey.duration}
          cost={(journey.fare?.totalCost / 100).toFixed(2)}
          charge_level={journey.fare?.fares[0].chargeLevel}
        />
        <div
          className={styles.hide_journey_map}
          onClick={() => handleOnClick(journeyIndex)}
        >
          {journeyIndex != 0 ? "Hide Journey" : ""}
        </div>

        <div>
          {/* Journey */}
          <div className={styles.journey_map}>
            {journey.legs.map((leg, legIndex) => (
              <div key={legIndex}>
                <div className={styles.journey_map_instruction}>
                  <div className={styles.undergrnd_logo}>
                    <Image
                      priority
                      fill
                      sizes="0"
                      src={undergroundLogo}
                      style={{ objectFit: "cover" }}
                      alt="Undergound logo"
                    />
                  </div>
                  <span>{leg.instruction.summary}</span>
                </div>

                <RouteCompressed
                  leg={leg}
                  legIndex={legIndex}
                  lineColor={getLineColor(
                    leg.routeOptions[0].lineIdentifier?.name
                  )}
                  duration={leg.duration}
                />
              </div>
            ))}

            {/* Last stopPoints */}
            <div className={styles.last_stop}>
              <div className={styles.undergrnd_logo}>
                <Image
                  priority
                  fill
                  sizes="0"
                  src={undergroundLogo}
                  style={{ objectFit: "cover" }}
                  alt="Undergound logo"
                />
              </div>
              <span>{stationLower(findStation(Number(targetTo)))}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className={styles.container_journey}>
      <div
        className={styles.letterbox_journey_map}
        onClick={() => handleOnClick(journeyIndex)}
      >
        {/* Second card */}
        <CardTwoHeader
          startTime={timeFormat(new Date(journey.startDateTime))}
          arrivaltTime={timeFormat(new Date(journey.arrivalDateTime))}
          duration={journey.duration}
          cost={(journey.fare?.totalCost / 100).toFixed(2)}
          charge_level={journey.fare?.fares[0].chargeLevel}
        />
      </div>
    </section>
  );
};

// Function to extract Station Names form the station object file
function findStation(value) {
  const foundObject = stationArray.find((item) => item.id === value);
  return foundObject ? foundObject.Station : null;
}
// Convert from Uppercase to only first letter uppercase
function stationLower(station) {
  return station.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}

//Function to format the time
function timeFormat(dateTime) {
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const trainTime = `${hours}:${formattedMinutes}`;
  return trainTime;
}

// Function to get the line color based on the line name
function getLineColor(lineName) {
  const line = undergroundLines.lines.find((line) => line.name === lineName);
  return line ? line.color : "white"; // Default to "white" if line color is not found
}

export default JourneyChild;
