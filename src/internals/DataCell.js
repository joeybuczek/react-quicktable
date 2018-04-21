import React from "react";
import PropTypes from "prop-types";

const DataCell = ({ record, recordApi, children }) => (
  <div>{children(record, recordApi)}</div>
);

DataCell.propTypes = {
  record: PropTypes.object,
  recordApi: PropTypes.object
};

export default DataCell;