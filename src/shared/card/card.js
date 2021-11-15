import "./card.css";

export default function BasicCard({ title="", energyProduced, energyLost, availability}) {
  return (
    <div className="Card">
      { title !== "" && <div className="title">{title}</div> }
      <div>
        <div className="line">
          Energy produced:
          <span className="whiteNumber"> {energyProduced}</span> Mwh
        </div>
        <div className="line">
          Energy lost:
          <span className="whiteNumber"> {energyLost}</span> Mwh
        </div>
        <div className="line">
          Availability:{" "}
          <span style={{ color: availability >= 0.97 ? "green" : "red" }}>
            {availability}
          </span>{" "}
          %
        </div>
        <div className="line">
          Worst turbine: <span className="whiteNumber"> {}</span>
        </div>
      </div>
    </div>
  );
}
