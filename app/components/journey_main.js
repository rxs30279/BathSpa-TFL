import { useState } from "react";
import styles from "../page.module.css";
// Components
import JourneyChild from "./journey_child";
import CardOne from "./journey_card_one";
// Data files
import undergroundLines from "./assets/station_colors";
import stationArray from "./assets/ICS Station Codes and addresses.json";

const FetchData = ({ journeyData }) => {
  //Retrieve From and To Destinations from the API call data
  const targetFrom = journeyData.journeyVector.from;
  const targetTo = journeyData.journeyVector.to;

  // Render the fetched data here

  return (
    <>
      <section className={styles.container_journey}>
        {/* First card */}
        <CardOne
          fromStation={stationLower(findStation(Number(targetFrom)))}
          toStation={stationLower(findStation(Number(targetTo)))}
        />
      </section>

      <div>
        {journeyData.journeys.map((journey, journeyIndex) => (
          <div key={journeyIndex}>
            <JourneyChild
              journey={journey}
              journeyIndex={journeyIndex}
              targetFrom={targetFrom}
              targetTo={targetTo}
            />
          </div>
        ))}
      </div>
    </>
  );
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
