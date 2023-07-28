import styles from "../page.module.css";
// Images
import Image from "next/image";
import undergroundLogo from "./images/Underground_logo.jpeg";
// Data files
import undergroundLines from "./assets/station_colors";
import stationArray from "./assets/ICS Station Codes and addresses.json";
// Components
// import CardOne from "./journey_card_one";

const FetchData = ({ journeyData }) => {
  // Show a loading message or spinner until the data is available
  if (!journeyData) {
    return <div>Loading...</div>;
  } else {
    const targetFrom = journeyData.journeyVector.from;
    const targetTo = journeyData.journeyVector.to;

    // Convert From and To station id's to station Names
    const fromStation = stationLower(findStation(Number(targetFrom)));
    const toStation = stationLower(findStation(Number(targetTo)));

    const journeyNumber = 0;

    // Get the train time

    const start = new Date(journeyData.journeys[journeyNumber].startDateTime);
    const startTime = timeFormat(start);

    const end = new Date(journeyData.journeys[journeyNumber].arrivalDateTime);
    const arrivaltTime = timeFormat(end);

    // Duration
    const duration = journeyData.journeys[journeyNumber].duration;

    // Get the cost of the train
    const cost = (
      journeyData.journeys[journeyNumber].fare.totalCost / 100
    ).toFixed(2);
    const charge_level =
      journeyData.journeys[journeyNumber].fare?.fares[0].chargeLevel;

    // Render the fetched data here

    // First card

    return (
      <div className={styles.container_journey}>
        <div className={styles.letterbox_journey}>
          <span>
            From: &nbsp;<strong>{fromStation}</strong>
          </span>

          <span>
            To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <strong> {toStation}</strong>
          </span>
        </div>

        {/* Second card */}

        <div className={styles.letterbox_journey_map}>
          <div className={styles.train_times}>
            <span>
              {startTime} - {arrivaltTime}
            </span>
            <span>
              {duration}&nbsp; <small> mins</small>
            </span>
          </div>

          <span className={styles.cost_of_journey}>
            £{cost}&nbsp; {charge_level}
          </span>
          <div>
            {/* Journey */}
            <div className={styles.journey_map}>
              {journeyData.journeys[journeyNumber].legs.map((leg, legIndex) => (
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
                  <div
                    style={{
                      height: "5.5rem",
                      borderColor: getLineColor(
                        leg.routeOptions[0].lineIdentifier?.name
                      ),
                    }}
                    className={styles.journey_map_line}
                  >
                    <div>
                      &nbsp;&nbsp;{leg.duration}
                      &nbsp;mins
                    </div>
                    <span>view stops</span>
                  </div>
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
                <span>{toStation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FetchData;

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
