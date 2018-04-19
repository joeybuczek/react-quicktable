import React, { Component } from "react";
import PropTypes from "prop-types";

// Local vars
const pagerNavButtonStyle = {
  border: "1px solid #AAA",
  backgroundColor: "#FFF",
  height: 30,
  width: 30,
  outline: "none",
  margin: "0px 2px"
};
const pagerNavButtonDisabledStyle = {
  backgroundColor: "#EEE",
  color: "#AAA"
};

class PagerNavButton extends Component {
  render() {
    let { text, onClick, className, style, disabled } = this.props;
    return (
      <button
        style={{
          ...(style || pagerNavButtonStyle),
          ...(disabled ? pagerNavButtonDisabledStyle : {})
        }}
        className={className}
        disabled={disabled}
        onClick={!disabled ? onClick : null}
      >
        {text}
      </button>
    );
  }
}

PagerNavButton.propTypes = {
  text: PropTypes.any,
  onClick: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default PagerNavButton;
