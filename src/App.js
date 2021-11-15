import React, { useEffect, useState } from "react";
import BasicCard from "./shared/card/card.js";
import Select from "./shared/select.js";
import Months from "./shared/constants.js";
import "./App.css";

function App() {
  const [month1, setMonth1] = useState(1);
  const [month2, setMonth2] = useState(1);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const url = `https://interview-availability-api.herokuapp.com/availability-data?from=` +
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


  function setParam(month='January', event) {
    console.log(month, event.target.value)
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
            <BasicCard />
         </div>
      <div className="monthlyMetrics">
        <b className="title">MONTHLY METRICS</b>
        <div className="CardsContainer">
          {result.length > 0 &&
            result.map((card) => {
              let month = card.bucket;
   
              return (
                <BasicCard
                  energyProduced={card.energyProduced}
                  energyLost={card.energyLost}
                  availability={
                    card.energyProduced /
                    (card.energyProduced + card.energyLost)
                  }
                  title={month.substring(5, 7)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
