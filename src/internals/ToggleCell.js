import React, { Component } from "react";
import PropTypes from "prop-types";
import { __toggled__ } from "../util";

class ToggleCell extends Component {
  render() {
    let {
      record,
      onClick,
      style,
      allowToggle,
      expandedIcon,
      collapsedIcon
    } = this.props;
    return (
      <td
        onClick={allowToggle ? onClick : null}
        className="quicktable-toggle-cell"
        style={{
          ...(style || {}),
          borderBottom: "1px solid transparent",
          cursor: allowToggle ? "pointer" : ""
        }}
      >
        <span
          className="quicktable-toggle-icon"
          style={{ display: allowToggle ? "" : "none" }}
        >
          {record[__toggled__] ? expandedIcon : collapsedIcon}
        </span>
      </td>
    );
  }
}

ToggleCell.propTypes = {
  record: PropTypes.object,
  onClick: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  allowToggle: PropTypes.bool
};

export default ToggleCell;
