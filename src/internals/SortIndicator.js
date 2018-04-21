import React from "react";
import PropTypes from "prop-types";

const SortIndicator = ({ direction, ascIcon, descIcon }) => (
  <span
    aria-label="Sort icon"
    title="Sort"
    className="quicktable-sort-icon"
    style={{ marginLeft: 10, cursor: "pointer" }}
  >
    {direction === "asc" ? ascIcon : descIcon}
  </span>
);

SortIndicator.propTypes = {
  direction: PropTypes.string,
  ascIcon: PropTypes.any,
  descIcon: PropTypes.any
};

export default SortIndicator;
