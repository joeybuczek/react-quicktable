import React, { Component } from "react";
import PropTypes from "prop-types";
import PagerNavButton from "./PagerNavButton";
import PagerNavSelect from "./PagerNavSelect";
import { calcDisplayRange, calcPageNumbers, calcTotalPages } from "../util";

// Pager vars
const pagerStyle = {
  margin: "5px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const pagerPerPage = {};
const pagerResults = { marginLeft: "auto" };

class Pager extends Component {
  render() {
    let { pagingOptions, dataset } = this.props;
    let {
      handlePrevPage,
      handleNextPage,
      handleSetPage,
      handleSetPageLimit,
      pageLimits,
      perPage,
      page
    } = pagingOptions;
    let totalPages = calcTotalPages(dataset, pagingOptions);
    return (
      <div style={pagerStyle}>
        <div>
          <PagerNavButton
            title="Previous page"
            text="«"
            onClick={handlePrevPage}
            disabled={!page || page <= 1}
          />
          <PagerNavSelect
            title="Page"
            onChange={handleSetPage}
            options={calcPageNumbers(totalPages)}
            value={page}
            disabled={!page || !totalPages || totalPages <= 1}
          />
          <PagerNavButton
            title="Next page"
            text="»"
            onClick={handleNextPage}
            disabled={!totalPages || page >= totalPages}
          />
        </div>

        <div style={pagerPerPage}>
          <PagerNavSelect
            title="Per page limit"
            onChange={handleSetPageLimit}
            options={pageLimits}
            value={perPage}
            disabled={!page || !totalPages}
          />
          <span style={{ marginLeft: 5 }}>per page</span>
        </div>

        <span style={pagerResults}>
          {calcDisplayRange(dataset, pagingOptions)}
        </span>
      </div>
    );
  }
}

Pager.propTypes = {
  pagingOptions: PropTypes.object,
  dataset: PropTypes.array
};

export default Pager;
