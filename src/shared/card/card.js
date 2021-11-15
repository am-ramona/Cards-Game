import * as React from "react";
import "./card.css";

export default function BasicCard(props) {
  return (
    <div className="Card">
      <div className="title">{props.title}</div>
      <div>
        <div className="line">
          Energy produced:
          <span className="whiteNumber"> {props.energyProduced}</span> Mwh
        </div>
        <div className="line">
          Energy lost:
          <span className="whiteNumber"> {props.energyLost}</span> Mwh
        </div>
        <div className="line">
          Availability: 
          <span style={{ color: props.availability >= 0.97 ? "green" : "red" }}>
             {props.availability}
          </span>
          %
        </div>
        <div className="line">
          Worst turbine: <span className="whiteNumber"> {}</span>
        </div>
      </div>
    </div>
  );
}
