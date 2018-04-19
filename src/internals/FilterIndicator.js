import React, { Component } from "react";
import PropTypes from "prop-types";

class FilterIndicator extends Component {
  render() {
    let { filterApplied, filterIcon, onClick } = this.props;
    let onStyle = { color: "green" };
    let offStyle = { color: "#AAA" };
    return (
      <span style={{ marginLeft: 10, cursor: "pointer" }} onClick={onClick}>
        <span style={filterApplied ? onStyle : offStyle}>
          {filterIcon || "⊆"}
        </span>
      </span>
    );
  }
}

FilterIndicator.propTypes = {
  filterApplied: PropTypes.bool,
  filterIcon: PropTypes.any,
  onClick: PropTypes.func
};

export default FilterIndicator;
