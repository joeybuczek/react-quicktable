import React, { Component } from "react";
import PropTypes from "prop-types";

/** 
 * Configure a column to be displayed in the QuickTable.
 * Children optional, but when implemented is rendered via function
 * and is passed the record object for each row rendered as first 
 * argument, recordApi as second.
 * (record, recordApi) => { ... }
 * */
class Column extends Component {
  render() {
    return <div />;
  }
}

/** Note: All prop/render logic is handled in QuickTable */

Column.propTypes = {
  /** The name of the column, maps to a data record's key to display corresponding value in row cell */
  name: PropTypes.string,

  /** Heading to display for column */
  heading: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),

  /** The className prop of the heading */
  className: PropTypes.string,

  /** The style prop of the heading */
  style: PropTypes.object,

  /** Used for determing correct sort/filter algorithms on column's data */
  dataType: PropTypes.string,

  /** Enables/Disables sorting for column */
  sortable: PropTypes.bool,

  /** Enables/Disables filtering for column */
  filterable: PropTypes.bool
};

export default Column;
