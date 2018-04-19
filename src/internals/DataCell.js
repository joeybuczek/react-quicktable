import React, { Component } from "react";
import PropTypes from "prop-types";

class DataCell extends Component {
  render() {
    let { record, recordApi } = this.props;
    return <div>{this.props.children(record, recordApi)}</div>;
  }
}

DataCell.propTypes = {
  record: PropTypes.object,
  recordApi: PropTypes.object
};

export default DataCell;