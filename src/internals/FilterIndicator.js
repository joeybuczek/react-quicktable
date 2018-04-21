import React from "react";
import PropTypes from "prop-types";

const FilterIndicator = ({ filterApplied, filterIcon, onClick }) => {
  let onStyle = { color: "green" };
  let offStyle = { color: "#676767" };
  return (
    <span style={{ marginLeft: 10, cursor: "pointer" }} onClick={onClick}>
      <span 
        aria-label="Filter Icon" 
        title="Filter" 
        style={filterApplied ? onStyle : offStyle}
      >
        {filterIcon || "⊆"}
      </span>
    </span>
  );
};

FilterIndicator.propTypes = {
  filterApplied: PropTypes.bool,
  filterIcon: PropTypes.any,
  onClick: PropTypes.func
};

export default FilterIndicator;
