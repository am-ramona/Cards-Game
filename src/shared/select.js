import { Months } from "./constants.js";

export default function Select({ onChange }) {
  return (
    <select onChange={(event) => onChange(event)}>
      {Months.map((month, index) => {
        return <option key={index} value={month.value}>{month.name}</option>;
      })}
    </select>
  );
}
