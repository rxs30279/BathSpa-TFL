import styles from "../page.module.css";
import { useState } from "react";
// Components
import CardTwoHeader from "./journey_card_two_header";
import RouteCompressed from "./route_compressed";
// Images
import Image from "next/image";
import undergroundLogo from "./images/Underground_logo.jpeg";
import bus from "./images/bus.svg";
import walk from "./images/walking.png";

// Data files
import undergroundLines from "./assets/station_colors";
import stationArray from "./assets/ICS Station Codes and addresses.json";

const JourneyChild = (props) => {
  const { journey, journeyIndex, targetFrom, targetTo } = props;
  const [count, setCount] = useState(0);

  console.log("count", count);
  const [expandJourney, setExpandJourney] = useState("");
  const handleOnClick = (journeyIndex) => {
    journeyIndex === expandJourney
      ? setExpandJourney(null)
      : setExpandJourney(journeyIndex);
    setCount((count) => count + 1);
  };

  //Render

  return (expandJourney === journeyIndex) |
    (journeyIndex === 0 && count === 0) ? (
    <section className={styles.container_journey}>
      {/* Second card */}

      <div className={styles.letterbox_journey_map}>
        <div onClick={() => handleOnClick(journeyIndex)}>
          <div className={styles.train_times}>
            <span>
              {timeFormat(new Date(journey.startDateTime))} -{" "}
              {timeFormat(new Date(journey.arrivalDateTime))}
            </span>
            <span>
              {journey.duration}&nbsp; <small> mins</small>
            </span>
          </div>
          <div>
            <span className={styles.cost_of_journey}>
              £{(journey.fare?.totalCost / 100).toFixed(2)}&nbsp;{" "}
              {journey.fare?.fares[0].chargeLevel}
            </span>
          </div>
        </div>

        <div>
          {/* Journey */}
          <div className={styles.journey_map}>
            {journey.legs.map((leg, legIndex) => (
              <div key={legIndex}>
                <div className={styles.journey_map_instruction}>
                  {/* Is this walking or a bus */}
                  {leg.instruction.summary.toLowerCase().includes("bus") ? (
                    <div className={styles.undergrnd_logo}>
                      <Image
                        priority
                        fill
                        sizes="0"
                        src={bus}
                        style={{ objectFit: "cover" }}
                        alt="London bus"
                      />
                    </div>
                  ) : leg.instruction.summary.toLowerCase().includes("walk") ? (
                    <div className={styles.undergrnd_logo_walk}>
                      <Image
                        priority
                        fill
                        sizes="0"
                        src={walk}
                        style={{ objectFit: "cover" }}
                        alt="Undergound logo"
                      />
                    </div>
                  ) : (
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
                  )}
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
