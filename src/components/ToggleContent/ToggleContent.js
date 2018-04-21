import React from "react";
import PropTypes from "prop-types";

/** 
 * Content to be displayed when row is expanded. Children are
 * rendered via function, and record for row being rendered is 
 * passed as first argument, recordApi as second. 
 * (record, recordApi) => { ... } 
 * */
const ToggleContent = props => <div />;

/** 
 * Note: All prop/render logic is handled in QuickTable 
 * This component is for simplicity of configuration
 * */

ToggleContent.propTypes = {
  /** Determines if row is able to be toggled, must return a boolean: (record) => { ... } */
  toggleFor: PropTypes.func.isRequired,

  /** The style prop of the content being rendered */
  style: PropTypes.object,

  /** The className prop of the content being rendered */
  className: PropTypes.string
};

export default ToggleContent;