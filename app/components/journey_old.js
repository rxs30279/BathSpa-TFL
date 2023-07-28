"use client";
import Input from "./input";

const FetchData = (props) => {
  console.log(
    "output component",
    props.stationFrom,
    props.stationTo,
    props.stationVia
  );
  let url = `https://api.tfl.gov.uk/Journey/JourneyResults/${props.stationFrom}/to/${props.stationTo}?via=${props.stationVia}&mode=tube&maxWalkingMinutes=0`;
  // "https://api.tfl.gov.uk/Journey/JourneyResults/1000070/to/1000184?via=1000139&mode=tube&maxWalkingMinutes=0";

  const options = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  };

  const response = fetch(url, options)
    .then((res) => res.json())
    .then((obj) => {
      console.log("output", obj);
      //  Just taking the first trip given by the API journeys[0].
      // There maybe more than one leg: Find the number of stopPoints in each leg of the journey
      const journeyNum = 0;
      const numberOfLegs = obj.journeys[journeyNum].legs.length;

      console.log("fare", obj.journeys[journeyNum].fare.totalCost);

      console.log(
        "Charge Level",
        obj.journeys[journeyNum].fare.fares[0].chargeLevel
      );
      console.log("Start Date Time", obj.journeys[journeyNum].startDateTime);
      console.log(
        "Arrival Date Time",
        obj.journeys[journeyNum].arrivalDateTime
      );
      console.log(
        "Overall Duration minutes",
        obj.journeys[journeyNum].duration
      );
      console.log("Number of legs", numberOfLegs);
      console.log(
        "Departure Point",
        obj.journeys[journeyNum].legs[0].departurePoint.commonName
      );
      var i = 0;
      //Identify the number of stops in each leg
      for (i = 0; i < numberOfLegs; i++) {
        const numberOfStopPoints =
          obj.journeys[journeyNum].legs[i].path.stopPoints.length;

        // If Exists: Output the line this leg is on, may not exist if walking etc

        console.log(
          obj.journeys[journeyNum].legs[i].routeOptions[0].lineIdentifier?.name
        );

        console.log("Duration", obj.journeys[journeyNum].legs[i].duration);
        console.log(
          "Instruction",
          obj.journeys[journeyNum].legs[i].instruction.summary
        );
        //   Output the stations in this leg
        var x = 0;
        if (obj.journeys[journeyNum].legs[i].path.stopPoints[0].name) {
          for (x = 0; x < numberOfStopPoints; x++) {
            const station =
              obj.journeys[journeyNum].legs[i].path.stopPoints[x].name;
            console.log(`${i} ${x} ${station}`);
          }
        } else {
          console.log("i think you are walking");
        }
      }
    });
};

export default FetchData;
