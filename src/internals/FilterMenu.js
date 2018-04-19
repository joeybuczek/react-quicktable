import React, { Component } from "react";
import PropTypes from "prop-types";

class FilterMenu extends Component {
  // Get all filter method options for the given dataType
  getFilterOptions = () => {
    let { filters, dataType } = this.props;
    let filterOptions = [
      <option key="choosefilter" value="">
        {"Choose a filter"}
      </option>
    ];
    Object.keys(filters).forEach((f, i) => {
      if (filters[f].dataType === dataType) {
        filterOptions.push(
          <option key={i} value={f}>
            {filters[f].displayText}
          </option>
        );
      }
    });
    return filterOptions;
  };

  // Change event handlers
  handleSelectChange = e => {
    let { addFilter, removeFilter, column } = this.props;
    if (e.target.value) {
      addFilter({ column, method: e.target.value });
    } else {
      removeFilter({ column });
    }
  };
  handleInputChange = e => {
    let { updateFilter, column } = this.props;
    updateFilter({ column, value: e.target.value });
  };

  /**
   * Get acceptable left position for menuDiv based on column
   * index so that the menu doesn't render off-screen when too
   * far to the right. Can be revisited if poses more of a
   * problem than a solution.
   */

  getLeft = () => {
    let { columnCount, columnIndex } = this.props;
    return columnIndex < Math.floor(columnCount / 2) ? 0 : -100;
  };

  render() {
    let { selectValue, inputValue, hidden } = this.props;
    let controlStyle = {
      display: "block",
      width: "100%",
      height: 24,
      fontSize: ".75em"
    };
    return (
      <div
        ref={ref => {
          this.menuDiv = ref;
        }}
        style={{
          backgroundColor: "#FFF",
          border: "2px groove #AAA",
          padding: 3,
          position: "absolute",
          top: 3,
          left: this.getLeft(),
          zIndex: 999,
          width: 150,
          display: hidden ? "none" : ""
        }}
      >
        <div>
          <select
            name="method"
            style={controlStyle}
            value={selectValue}
            onChange={this.handleSelectChange}
          >
            {this.getFilterOptions()}
          </select>
        </div>
        <div>
          <input
            name="arg"
            value={inputValue}
            style={{ ...controlStyle, paddingLeft: 4 }}
            placeholder="Value to match"
            onChange={this.handleInputChange}
          />
        </div>
      </div>
    );
  }
}

FilterMenu.propTypes = {
  filters: PropTypes.object,
  dataType: PropTypes.string,
  addFilter: PropTypes.func,
  updateFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  selectValue: PropTypes.any,
  inputValue: PropTypes.any,
  hidden: PropTypes.bool,
  column: PropTypes.string,
  columnCount: PropTypes.number,
  columnIndex: PropTypes.number
};

export default FilterMenu;
