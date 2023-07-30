"use client";
import greggs_logo from "./images/greggs-logo.jpg";
import Image from "next/image";
import styles from "../page.module.css";
import { useState } from "react";
import FetchData from "./journey_main";
import stnData from "./assets/ICS Station Codes and addresses.json";

export default function Input() {
  const [station, setState] = useState({
    stationFrom: "",
    stationFromId: "",
    stationTo: "",
    stationToId: "",
    // stationVia: "",
  });

  const [submitted, setSubmitted] = useState(false); // To track if the form is submitted
  const [journeyData, setJourneyData] = useState(null);
  const [filteredOptionsFrom, setFilteredOptionsFrom] = useState([]);
  const [filteredOptionsTo, setFilteredOptionsTo] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Look up the statio ID
    // Get the data from the API call

    const data = await fetchData(
      station.stationFromId,
      station.stationToId
      // station.stationVia
    );

    console.log("journeyData", data);
    setJourneyData(data);
    setSubmitted(true); // Set submitted to true after form submission
  };

  const updateFieldFrom = (e) => {
    const getText = e.target.value.toLowerCase();
    if (getText.trim().length > 0) {
      const matchedText = stnData.filter(function (text) {
        return text.Station.toLowerCase().includes(getText);
      });

      // console.log("getText", getText);
      // console.log("matchedText", matchedText);

      setFilteredOptionsFrom(matchedText.slice(0, 6));
    } else {
      setFilteredOptionsFrom([]);
    }
    setState({
      ...station,
      [e.target.name]: e.target.value,
    });
  };

  const updateFieldTo = (e) => {
    const getText = e.target.value.toLowerCase();
    if (getText.trim().length > 0) {
      const matchedText = stnData.filter(function (text) {
        return text.Station.toLowerCase().includes(getText);
      });

      setFilteredOptionsTo(matchedText.slice(0, 6));
    } else {
      setFilteredOptionsTo([]);
    }

    setState({
      ...station,
      [e.target.name]: e.target.value,
    });
  };
  // handle onclick event from dropdown To and From
  const handleItemClickFrom = (item, id) => {
    setState({
      ...station,
      stationFrom: item,
      stationFromId: id,
    });
    setFilteredOptionsFrom([]);
  };

  const handleItemClickTo = (item, id) => {
    setState({
      ...station,
      stationTo: item,
      stationToId: id,
    });
    setFilteredOptionsTo([]);
  };

  return !submitted ? (
    <section>
      <div className={styles.outer_container}>
        <div className={styles.input_container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_form}>
              <div className={styles.input_header}>Plan A Journey</div>

              <input
                className={styles.input_box}
                type="text"
                id="travel-from"
                value={station.stationFrom}
                name="stationFrom"
                onChange={updateFieldFrom}
                placeholder="From"
              />
              <ul
                className={
                  filteredOptionsFrom.length > 0
                    ? styles.dropdown
                    : styles.dropdown_none
                }
              >
                {filteredOptionsFrom.map((station) => (
                  <li
                    key={station.id}
                    onClick={() =>
                      handleItemClickFrom(station.Station, station.id)
                    }
                  >
                    {station.Station}
                  </li>
                ))}
              </ul>
              <input
                className={styles.input_box}
                type="text"
                id="travel-to"
                value={station.stationTo}
                name="stationTo"
                onChange={updateFieldTo}
                placeholder="To"
              />

              <ul
                className={
                  filteredOptionsTo.length > 0
                    ? styles.dropdown
                    : styles.dropdown_none
                }
              >
                {filteredOptionsTo.map((station) => (
                  <li
                    onClick={() =>
                      handleItemClickTo(station.Station, station.id)
                    }
                    key={station.id}
                  >
                    {station.Station}
                  </li>
                ))}
              </ul>

              <button type="submit" className={styles.button}>
                Go plan my journey
              </button>
            </div>
          </form>
        </div>

        <div className={styles.greggs_logo}>
          <Image
            priority
            style={{ objectFit: "cover" }}
            src={greggs_logo}
            fill
            alt="greggs logo advertisment"
          />
        </div>
      </div>
    </section>
  ) : (
    <FetchData journeyData={journeyData} />
  );
}

async function fetchData(stationFrom, stationTo, stationVia) {
  let url = `https://api.tfl.gov.uk/Journey/JourneyResults/${stationFrom}/to/${stationTo}`;
  // "https://api.tfl.gov.uk/Journey/JourneyResults/1000070/to/1000184?via=1000139&mode=tube&maxWalkingMinutes=0";

  const options = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  };

  const response = await fetch(url, options);
  const obj = await response.json();
  return obj;
}
