import React from "react";
import PropTypes from "prop-types";
import { __toggled__ } from "../util";

const ToggleCell = ({
  record,
  onClick,
  style,
  allowToggle,
  expandedIcon,
  collapsedIcon
}) => (
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
      aria-label="Toggle row content icon"
      title="Toggle row content"
      className="quicktable-toggle-icon"
      style={{ display: allowToggle ? "" : "none" }}
    >
      {record[__toggled__] ? expandedIcon : collapsedIcon}
    </span>
  </td>
);

ToggleCell.propTypes = {
  record: PropTypes.object,
  onClick: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  allowToggle: PropTypes.bool
};

export default ToggleCell;
