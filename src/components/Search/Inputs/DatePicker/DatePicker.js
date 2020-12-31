import moment from "moment";

export default function DatePicker({ value, onChange }) {
  const minDate = moment().add(2, "hours").format("YYYY-MM-DD");
  const maxDate = moment().add(2, "hours").add(1, "year").format("YYYY-MM-DD");

  return (
    <input
      type="date"
      min={minDate}
      max={maxDate}
      value={value}
      onChange={onChange}
    />
  );
}
