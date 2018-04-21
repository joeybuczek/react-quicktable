import React from "react";
import PropTypes from "prop-types";

const ToggleRow = ({ record, recordApi, colSpan, style, className, children }) => (
  <tr>
    <td style={{ borderBottom: "1px solid transparent" }} colSpan={1} />
    <td style={style || {}} className={`${className}`} colSpan={colSpan}>
      {children(record, recordApi)}
    </td>
  </tr>
);

ToggleRow.propTypes = {
  record: PropTypes.any,
  recordApi: PropTypes.any,
  colSpan: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

export default ToggleRow;
