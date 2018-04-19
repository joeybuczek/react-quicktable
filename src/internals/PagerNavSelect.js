import React, { Component } from "react";
import PropTypes from "prop-types";

// Local vars
const pagerNavSelectStyle = {
  border: "1px solid #AAA",
  backgroundColor: "#FFF",
  height: 30
};
const pagerNavSelectDisabledStyle = {
  backgroundColor: "#EEE",
  color: "#AAA"
};

class PagerNavSelect extends Component {
  getOptions = (options = []) => {
    return options.map((o, i) => (
      <option key={i} value={o}>
        {o}
      </option>
    ));
  };

  render() {
    let { onChange, className, style, options, disabled, value } = this.props;
    return (
      <select
        className={className}
        style={{
          ...(style || pagerNavSelectStyle),
          ...(disabled ? pagerNavSelectDisabledStyle : {})
        }}
        value={value}
        disabled={disabled}
        onChange={!disabled ? onChange : null}
      >
        {this.getOptions(options)}
      </select>
    );
  }
}

PagerNavSelect.propTypes = {
  onChange: PropTypes.any, 
  style: PropTypes.object, 
  className: PropTypes.string, 
  options: PropTypes.array, 
  disabled: PropTypes.bool, 
  value: PropTypes.any
};

export default PagerNavSelect;
