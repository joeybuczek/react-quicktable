import React, { Component } from "react";
import PropTypes from "prop-types";

class ToggleRow extends Component {
  render() {
    let { record, recordApi, colSpan, style, className } = this.props;
    return (
      <tr>
        <td style={{ borderBottom: "1px solid transparent" }} colSpan={1} />
        <td style={style || {}} className={`${className}`} colSpan={colSpan}>
          {this.props.children(record, recordApi)}
        </td>
      </tr>
    );
  }
}

ToggleRow.propTypes = {
  record: PropTypes.any,
  recordApi: PropTypes.any,
  colSpan: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ToggleRow;
