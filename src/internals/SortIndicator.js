import React, { Component } from "react";
import PropTypes from "prop-types";

class SortIndicator extends Component {
  render() {
    let { direction, ascIcon, descIcon } = this.props;
    return (
      <span
        className="quicktable-sort-icon"
        style={{ marginLeft: 10, cursor: "pointer" }}
      >
        {direction === "asc" ? ascIcon : descIcon}
      </span>
    );
  }
}

SortIndicator.propTypes = {
  direction: PropTypes.string,
  onClick: PropTypes.any,
  ascIcon: PropTypes.any,
  descIcon: PropTypes.any
};

export default SortIndicator;
