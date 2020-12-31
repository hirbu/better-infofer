import { useState } from "react";

import Autosuggest from "react-autosuggest";

const stations = require("../../../../data/stations.json");

const getSuggestions = (value) => {
  const clear = (str) => {
    return str
      .toLowerCase()
      .replaceAll("ă", "a")
      .replaceAll("â", "a")
      .replaceAll("î", "i")
      .replaceAll("ș", "s")
      .replaceAll("ț", "t");
  };

  const inputValue = clear(value);
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : stations
        .filter((station) => station[1].slice(0, inputLength) === inputValue)
        .slice(0, 5);
};

const getSuggestionValue = (suggestion) => suggestion[0];

const renderSuggestion = (suggestion) => (
  <div className="suggestion">{suggestion[0]}</div>
);

export default function Input({ id, value, set, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    value,
    onChange: (e, { newValue }) => {
      set(newValue);
    },
    placeholder: placeholder,
  };

  return (
    <Autosuggest
      id={id}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        suggestionsContainer: {
          position: "relative",
          zIndex: "10",
        },
        suggestionsList: {
          position: "absolute",
          backgroundColor: "white",
          marginTop: "0",
          width: "100%",
          listStyle: "none",
          padding: 0,
        },
        suggestion: {
          padding: "1rem",
          fontSize: "2rem",
          letterSpacing: "-1px",
          border: "1px solid black",
          borderTop: "none",
          fontWeight: "lighter",
        },
        suggestionFirst: {},
        suggestionHighlighted: {
          fontWeight: "normal",
        },
      }}
    />
  );
}
