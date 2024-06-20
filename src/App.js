  import React, { useEffect, useState } from "react";
  import BasicCard from "./shared/card/card.js";
  import Select from "./shared/select.js";
  import { Months } from "./shared/constants.js";
  import "./App.css";

  function App() {
    const [month1, setMonth1] = useState(1);
    const [month2, setMonth2] = useState(1);
    const [result, setResult] = useState([]);
    const [grouped, setGrouped] = useState([]);
    const [maxEnergyProduced, setMaxEnergyProduced] = useState(0);
    const [maxEnergyLost, setMaxEnergyLost] = useState(0);

    useEffect(() => {
      const url =
        `https://api.herokuapp.com/availability-data?from=` +
        month1 +
        `&to=` +
        month2;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          setResult(json);
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchData();
    }, [month1, month2]);

    useEffect(() => {
      if (result.length > 0) {
        var keys = ["energyProduced", "energyLost", "turbine"],
          grouped = Object.values(
            result.reduce((result, object) => {
              result[object.bucket.substring(0, 7)] = result[
                object.bucket.substring(0, 7)
              ] || { bucket: object.bucket };
              keys.forEach(
                (key) =>
                key !== 'turbine' ? (result[object.bucket.substring(0, 7)][key] =
                    (result[object.bucket.substring(0, 7)][key] || 0) +
                    object[key])
                    : (result[object.bucket.substring(0, 7)][key] =
                    ((result[object.bucket.substring(0, 7)][key] || 0) <
                    object[key]) ? result[object.bucket.substring(0, 7)] : object)
              );
              return result;
            }, Object.create(null))
          );

        setGrouped(grouped);

        // console.log(grouped, "grouped");
      }
    }, [result]);

      useEffect(() => {
        if (grouped.length > 0) {

          var maxEnergyProduced = grouped.reduce(function (total, currentValue) {
            return total + currentValue.energyProduced;
          }, 0);

          var maxEnergyLost = grouped.reduce(function (total, currentValue) {
            return total + currentValue.energyLost;
          }, 0);

          setMaxEnergyProduced(maxEnergyProduced);
          setMaxEnergyLost(maxEnergyLost);
        }
      }, [grouped]);

    function setParam(month = "January", event) {
      month === "month1"
        ? setMonth1(event.target.value)
        : setMonth2(event.target.value);
    }

    return (
      <div className="App">
        <header>
          <div className="smallTitle">Show data between</div>
          <div className="parametersWrapper">
            <Select onChange={(event) => setParam("month1", event)} />
            &nbsp; and &nbsp;
            <Select onChange={(event) => setParam("month2", event)} />
          </div>
        </header>
        <div className="farmMetrics">
          <b className="title">FARM METRICS</b>
          { grouped.length > 0 &&
          <BasicCard
            energyProduced={maxEnergyProduced}
            energyLost={maxEnergyLost}
            availability={
              (maxEnergyProduced / (maxEnergyProduced + maxEnergyLost)) * 100
            }
          />
          }
        </div>
        <div className="monthlyMetrics">
          <b className="title">MONTHLY METRICS</b>
          <div className="CardsContainer">
            {grouped.length > 0 &&
              grouped.map((card, index) => {
                let monthNB = parseInt(card.bucket.substring(5, 7), 10);
                return (
                  <BasicCard
                    key={index}
                    energyProduced={card.energyProduced}
                    energyLost={card.energyLost}
                    availability={
                      (card.energyProduced /
                        (card.energyProduced + card.energyLost)) *
                      100
                    }
                    title={Months.filter((item) => item.value === monthNB).map(
                      (item) => item.name
                    )}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  export default App;
