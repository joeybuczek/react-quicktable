// Final step before push to github => add accessibility options!
import React, { Component } from "react";
import PropTypes from "prop-types";
import Column from "../Column";
import {
  DataCell,
  FilterIndicator,
  FilterMenu,
  Pager,
  SortIndicator,
  ToggleCell,
  ToggleRow
} from "../internals";
import ToggleContent from "../ToggleContent";
import {
  copyObjectArray,
  appendRowProps,
  cleanOutputData,
  processDatasets,
  updateRecord,
  removeRecord,
  defaultFilterMethods,
  datasetsAreDifferent,
  canLimit,
  __rowId__,
  __toggled__,
  __none__
} from "../util";

/**
 * A feature-enabled table component for quickly displaying 
 * small to medium-sized datasets built in React.
 **/
class QuickTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnData: [],
      sortOptions: {
        enable: false,
        column: "",
        direction: "asc",
        dataType: "string",
        ascIcon: "˄",
        descIcon: "˅"
      },
      toggleOptions: {
        enable: false,
        toggleContent: [],
        records: [],
        isToggled: false,
        rowToggled: -1,
        multiToggle: false,
        collapsedIcon: "˃",
        expandedIcon: "˅"
      },
      filterOptions: {
        enable: false,
        filtersToApply: [],
        showFilterMenuFor: __none__
      },
      customFilters: {},
      limitOptions: { enable: false },
      pagingOptions: {
        enable: false,
        pageLimits: [10, 20, 50],
        perPage: 10,
        page: 1,
        firstRecord: 0
      },
      processNewDataset: false,
      datasets: {
        originalData: [],
        loadedData: [],
        displayedData: [],
        outputData: []
      }
    };
  }

  // ==========================================================
  //                     LIFECYCLE METHODS
  // ==========================================================
  componentDidMount() {
    // Update state with all data generated from props
    this.setState({ ...this.generateStateFromProps() });
  }
  componentDidUpdate() {
    if (this.state.processNewDataset) {
      this.setState({ ...this.generateStateFromProps() });
    }
    // If props.onChange provided, send output data to it
    this.props.onChange && this.handleDatasetChange();
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!nextProps.legacy) {
      // Determine if incoming data is different from what is loaded
      // by comparing the previous state to the new incoming props
      let different = datasetsAreDifferent(
        prevState.datasets.originalData,
        nextProps.data
      ); // [IMPORTED_METHOD]
      // Set the result in state to be handled by componentDidUpdate
      return { processNewDataset: different };
    } else {
      return null;
    }
  };

  // ==========================================================
  //                 LEGACY LIFECYCLE METHODS
  // ==========================================================
  componentWillReceiveProps(nextProps) {
    let { legacy } = this.props;
    if (legacy) {
      let different = datasetsAreDifferent(
        this.state.datasets.originalData,
        nextProps.data
      );
      this.setState({ processNewDataset: different });
    }
  }

  // ==========================================================
  //                 DATA PROCESSING METHODS
  // ==========================================================
  // Get initial state properties from props for mount and new incoming datasets
  generateStateFromProps = () => {
    // Get data from props
    let originalData = this.getIncomingDataset();
    let loadedData = this.prepareLoadedDataset(originalData);
    // Get all user-defined column details
    let columnData = this.getDataColumnDetails();
    // Get all user-defined options from props, pass in columnData for sorting defaults
    let incomingOptions = this.getIncomingOptions(columnData);
    // Get all options combined from user and initial state
    let options = this.getAllOptions(incomingOptions);
    // Process the datasets using the loadedData and the "all" options object
    let processedDatasets = this.getProcessedDatasets(loadedData, options);
    // Update state to render the table
    return {
      columnData,
      datasets: { ...processedDatasets, originalData },
      processNewDataset: false,
      ...options
    };
  };

  // Reset data and all other settings
  resetQuickTable = () => {
    this.setState({ ...this.generateStateFromProps() });
  };

  // Export output dataset
  exportData = () => {
    this.props.onExport(cleanOutputData(this.state.datasets.outputData));
  };

  // Output data to props.onChange if provided
  handleDatasetChange = () => {
    this.props.onChange(cleanOutputData(this.state.datasets.outputData));
  };

  // Get originalData from props
  getIncomingDataset = () => {
    return copyObjectArray(this.props.data);
  };

  // Append appropriate QuickTable-specific properties to dataset
  prepareLoadedDataset = dataset => {
    return appendRowProps(copyObjectArray(dataset));
  };

  // Process datasets using options provided
  getProcessedDatasets = (dataset, options) => {
    let { loadedData, displayedData, outputData } = processDatasets(
      dataset,
      options
    );
    return {
      loadedData,
      displayedData,
      outputData
    };
  };

  // Process request through data pipeline
  processRequestToChangeData = request => {
    let { loadedData, originalData } = this.state.datasets;
    let options = this.getAllOptions(request);
    let processedDatasets = this.getProcessedDatasets(loadedData, options);
    this.setState({
      datasets: { ...processedDatasets, originalData },
      ...options
    });
  };

  // ==========================================================
  //                   DATA CHANGE REQUESTS
  // ==========================================================
  // Send sortOptions to data pipeline
  sortRequest = (column, direction, dataType) => {
    let prevColumn = this.state.sortOptions.column;
    direction =
      column !== prevColumn ? "asc" : direction === "asc" ? "desc" : "asc";
    this.processRequestToChangeData({
      sortOptions: {
        column,
        direction,
        dataType
      }
    });
  };

  // Send recordApiOptions to data pipeline (options param is for recalc, etc)
  recordApiRequest = (method, record, options) => {
    this.processRequestToChangeData({
      recordApiOptions: {
        method,
        record
      },
      ...options
    });
  };

  // Send toggleOptions to data pipeline
  toggleRequest = record => {
    let { isToggled, rowToggled, multiToggle } = this.state.toggleOptions;
    let canToggle = false;

    // If multiToggle is true, allow more than 1 row to be toggled at a time
    if (multiToggle) {
      isToggled = !record[__toggled__];
      canToggle = true;
    } else {
      if (
        (!isToggled && rowToggled !== record[__rowId__]) ||
        (isToggled && rowToggled === record[__rowId__])
      ) {
        isToggled = !record[__toggled__];
        // If no row toggled, set rowToggled to -1
        rowToggled = isToggled ? record[__rowId__] : -1;
        canToggle = true;
      }
    }

    if (canToggle) {
      this.processRequestToChangeData({
        toggleOptions: {
          isToggled,
          rowToggled
        },
        recordApiOptions: {
          method: updateRecord,
          record: { ...record, [__toggled__]: isToggled }
        }
      });
    }
  };

  // Send filterOptions to data pipeline
  filterRequest = (filtersToApply, showFilterMenuFor) => {
    let { filterOptions } = this.state;
    if (filterOptions.enable) {
      this.processRequestToChangeData({
        filterOptions: {
          filtersToApply,
          showFilterMenuFor
        }
      });
    }
  };

  // Send pagingOptions to data pipeline
  pagingRequest = options => {
    let { pagingOptions } = this.state;
    if (pagingOptions.enable) {
      this.processRequestToChangeData({
        pagingOptions: {
          ...options
        }
      });
    }
  };

  // ==========================================================
  //                      FILTER METHODS
  // ==========================================================
  // Retrieve all filter methods
  getAllFilters = () => {
    return { ...defaultFilterMethods, ...this.state.customFilters }; // [IMPORTED_METHOD]
  };

  // Clear all filter settings
  clearFilters = () => {
    this.filterRequest([], __none__);
  };

  // Set/Unset the filter menu visibility based on column
  toggleFilterMenu = column => {
    let { filterOptions } = this.state;
    let { showFilterMenuFor } = filterOptions;
    filterOptions = {
      ...filterOptions,
      showFilterMenuFor: showFilterMenuFor === column ? __none__ : column
    };
    this.setState({ filterOptions });
  };

  // Set the on/off style for filter icon
  filterIsApplied = column => {
    let { filtersToApply } = this.state.filterOptions;
    return filtersToApply.filter(f => f.name === column).length > 0;
  };

  // Get the method/arg values for given column
  getAppliedFilterValues = column => {
    let { filtersToApply } = this.state.filterOptions;
    let appliedFilter = filtersToApply.filter(f => f.name === column);
    let filterValues =
      appliedFilter.length > 0
        ? {
            methodName: appliedFilter[0].methodName || "",
            arg: appliedFilter[0].arg || ""
          }
        : { methodName: "", arg: "" };
    return filterValues;
  };

  // Add a filter to apply to the dataset (or update an existing methodName)
  addFilterRequest = ({ column, method }) => {
    let allFilters = this.getAllFilters();
    let { filtersToApply, showFilterMenuFor } = this.state.filterOptions;
    let alreadyApplied =
      filtersToApply.filter(f => f.name === column).length > 0;
    // If already applied, update the method, otherwise push into filtersToApply
    if (alreadyApplied) {
      filtersToApply = filtersToApply.map(f => {
        if (f.name === column) {
          f.methodName = method;
          f.method = (allFilters[method] && allFilters[method].filter) || null;
        }
        return f;
      });
      this.filterRequest(filtersToApply);
    } else {
      filtersToApply.push({
        name: column,
        methodName: method,
        method: (allFilters[method] && allFilters[method].filter) || null,
        arg: ""
      });
      this.filterRequest(filtersToApply, showFilterMenuFor);
    }
  };

  // Update a filter query argument for an existing filter (does not update methodName)
  updateFilterRequest = ({ column, value }) => {
    let { filtersToApply, showFilterMenuFor } = this.state.filterOptions;
    let alreadyApplied =
      filtersToApply.filter(f => f.name === column).length > 0;
    if (alreadyApplied) {
      filtersToApply = filtersToApply.map(f => {
        if (f.name === column) f.arg = value;
        return f;
      });
      this.filterRequest(filtersToApply, showFilterMenuFor);
    }
  };

  // Remove a filter from the applied filters
  removeFilterRequest = ({ column }) => {
    let { filtersToApply, showFilterMenuFor } = this.state.filterOptions;
    let alreadyApplied =
      filtersToApply.filter(f => f.name === column).length > 0;
    if (alreadyApplied) {
      filtersToApply = filtersToApply.filter(f => f.name !== column);
      this.filterRequest(filtersToApply, showFilterMenuFor);
    }
  };

  // ==========================================================
  //                      PAGING METHODS
  // ==========================================================
  handlePrevPage = () => {
    let { page, perPage } = this.state.pagingOptions;
    this.pagingRequest({
      page: page - 1,
      firstRecord: (page - 1) * perPage - perPage
    });
  };
  handleNextPage = () => {
    let { page, perPage } = this.state.pagingOptions;
    this.pagingRequest({
      page: page + 1,
      firstRecord: (page + 1) * perPage - perPage
    });
  };
  handleSetPage = e => {
    let page = +e.target.value;
    let { perPage } = this.state.pagingOptions;
    this.pagingRequest({
      page,
      firstRecord: page * perPage - perPage
    });
  };
  handleSetPageLimit = e => {
    let perPage = +e.target.value;
    let page = 1;
    this.pagingRequest({
      page,
      perPage,
      firstRecord: page * perPage - perPage
    });
  };

  // ==========================================================
  //                   RECALCULATION METHODS
  // ==========================================================
  recalcPagingOptions = ({ __rowId__ }) => {
    let { displayedData } = this.state.datasets;
    let { toggleOptions } = this.state;
    if (!toggleOptions.multiToggle && toggleOptions.rowToggled === __rowId__) {
      toggleOptions.rowToggled = -1;
      toggleOptions.isToggled = false;
    }
    if (displayedData.length <= 1) {
      return {
        pagingOptions: {
          page: 1,
          firstRecord: 0
        },
        toggleOptions
      };
    }
    return {};
  };

  // ==========================================================
  //                     RECORDAPI METHODS
  // ==========================================================
  // Provide API methods object
  getRecordApi = () => {
    return {
      updateRecord: record => {
        this.recordApiRequest(updateRecord, record); // [IMPORTED_METHOD]
      },
      removeRecord: record => {
        let options = this.recalcPagingOptions(record);
        this.recordApiRequest(removeRecord, record, options); // [IMPORTED_METHOD]
      },
      toggleRecord: record => {
        this.toggleRequest(record);
      }
    };
  };

  // ==========================================================
  //                OPTIONS AND PROPS METHODS
  // ==========================================================
  // Get default options from props
  getIncomingOptions = columnData => {
    let {
      sortable,
      ascIcon,
      descIcon,
      defaultSortColumn,
      defaultSortDirection,
      filterable,
      customFilters,
      collapsedIcon,
      expandedIcon,
      multiToggle,
      pageable,
      pageLimits,
      perPage,
      limit
    } = this.props;
    let toggleContent = this.getToggleContent();

    // Get first sortable column by checking for "sortable" in column.details
    let sortableColumns =
      columnData.length > 0
        ? columnData.filter(column => column.details.sortable)
        : [];
    let firstSortableColumn =
      sortableColumns.length > 0 ? sortableColumns[0].details.name : "";
    // Set the initial column to sort on
    let column = defaultSortColumn || firstSortableColumn || "";
    // Set the initial sorting dataType
    let dataType =
      column && sortableColumns.length > 0
        ? sortableColumns.filter(c => c.details.name === column)[0].details
            .dataType || "string"
        : "string";

    return {
      sortOptions: {
        enable: !!sortable,
        ...(defaultSortColumn
          ? { column: defaultSortColumn }
          : firstSortableColumn ? { column: firstSortableColumn } : {}),
        ...(column ? { column } : {}),
        ...(defaultSortDirection ? { direction: defaultSortDirection } : {}),
        dataType,
        ...(ascIcon ? { ascIcon } : {}),
        ...(descIcon ? { descIcon } : {})
      },
      toggleOptions: {
        enable: toggleContent.length > 0,
        toggleContent,
        multiToggle: !!multiToggle,
        ...(collapsedIcon ? { collapsedIcon } : {}),
        ...(expandedIcon ? { expandedIcon } : {})
      },
      filterOptions: {
        enable: !!filterable,
        filtersToApply: [],
        showFilterMenuFor: __none__
      },
      customFilters,
      limitOptions: {
        enable: canLimit(limit), // [IMPORTED_METHOD]
        limit
      },
      pagingOptions: {
        enable: !!pageable,
        ...(pageLimits ? { pageLimits } : {}),
        ...(perPage
          ? { perPage }
          : pageLimits ? { perPage: pageLimits[0] } : { perPage: 10 }),
        page: 1,
        firstRecord: 0
      }
    };
  };

  // Get all options from request/state
  getAllOptions = request => {
    let {
      sortOptions,
      toggleOptions,
      filterOptions,
      limitOptions,
      pagingOptions,
      customFilters
    } = this.state;
    //toggleOptions.records = []; // Multiple records to toggle in the future?
    return {
      sortOptions: { ...sortOptions, ...request.sortOptions },
      toggleOptions: { ...toggleOptions, ...request.toggleOptions },
      filterOptions: { ...filterOptions, ...request.filterOptions },
      customFilters: request.customFilters || customFilters,
      limitOptions: { ...limitOptions, ...request.limitOptions },
      pagingOptions: { ...pagingOptions, ...request.pagingOptions },
      recordApiOptions: { ...request.recordApiOptions }
    };
  };

  // ==========================================================
  //                 CHILD COMPONENT METHODS
  // ==========================================================
  // Get all DataColumn Component details for constructing table rows/columns
  getDataColumnDetails = () => {
    let columnData = [];
    React.Children.forEach(this.props.children, (child, i) => {
      if (child.type === Column) {
        columnData.push({
          details: { ...child.props } // includes children (child.props.children)
        });
      }
    });
    return columnData;
  };

  getToggleContent = () => {
    let toggleContent = [];
    React.Children.forEach(this.props.children, (child, i) => {
      if (child.type === ToggleContent) {
        toggleContent.push({
          details: child.props // includes children (child.props.children)
        });
      }
    });
    return toggleContent;
  };

  // ==========================================================
  //                      RENDER METHODS
  // ==========================================================
  // Render heading row/cells
  handleSortIndicatorClick = (name, direction, dataType) =>
    this.sortRequest(name, direction, dataType);
  handleFilterIndicatorClick = name => this.toggleFilterMenu(name);
  renderTHead = () => {
    let { columnData, toggleOptions } = this.state;
    let { hideToggleColumn } = this.props;
    let toggleHeading = <th key="toggle-heading" style={{ width: 20 }} />;
    let headings = columnData.map((column, columnIndex) => {
      let {
        name,
        heading,
        className,
        style,
        sortable,
        filterable,
        dataType
      } = column.details;
      let {
        enable: sortEnabled,
        column: sortColumn,
        direction,
        ascIcon,
        descIcon
      } = this.state.sortOptions;
      let {
        enable: filterEnabled,
        showFilterMenuFor
      } = this.state.filterOptions;
      let { filterIcon } = this.props;
      let filterMenuValues = this.getAppliedFilterValues(name);
      return (
        <th
          key={columnIndex}
          className={className}
          style={{
            ...(style || {}),
            cursor: sortEnabled && sortable ? "pointer" : ""
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              onClick={
                sortEnabled && sortable
                  ? this.handleSortIndicatorClick.bind(
                      this,
                      name,
                      direction,
                      dataType
                    )
                  : null
              }
            >
              {heading || name}
              {sortEnabled && sortColumn === name ? (
                <SortIndicator
                  direction={direction}
                  ascIcon={ascIcon}
                  descIcon={descIcon}
                />
              ) : null}
            </div>
            {filterEnabled && filterable ? (
              <div>
                <FilterIndicator
                  filterApplied={this.filterIsApplied(name)}
                  filterIcon={filterIcon}
                  onClick={this.handleFilterIndicatorClick.bind(this, name)}
                />
                <div style={{ position: "relative" }}>
                  <FilterMenu
                    columnCount={columnData.length}
                    columnIndex={columnIndex}
                    filters={this.getAllFilters()}
                    dataType={dataType}
                    column={name}
                    hidden={showFilterMenuFor !== name}
                    addFilter={this.addFilterRequest}
                    updateFilter={this.updateFilterRequest}
                    removeFilter={this.removeFilterRequest}
                    selectValue={filterMenuValues.methodName || ""}
                    inputValue={filterMenuValues.arg || ""}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </th>
      );
    });

    // If toggle options exist, place toggle column first
    return [
      ...((toggleOptions.toggleContent.length > 0 && !hideToggleColumn) 
        ? [toggleHeading] 
        : [])
    ].concat(headings);
  };

  // Render body rows/cells
  handleRowToggleClick = record => this.toggleRequest(record);
  renderTBody = () => {
    let { columnData, datasets, toggleOptions } = this.state;
    let { displayedData } = datasets;
    let { rowStyle, hideToggleColumn } = this.props;
    let rows = [];
    displayedData.forEach((record, recordIndex) => {
      // Pre-check to see if toggle column should be enabled for row when shown
      // This is based on if any toggle.details.toggleFor(record) return true
      let allowToggle =
        toggleOptions.toggleContent.length > 0
          ? toggleOptions.toggleContent
              .map(toggle => toggle.details.toggleFor(record))
              .indexOf(true) > -1
          : false;

      let row = (
        <tr key={recordIndex}>
          {toggleOptions.toggleContent.length > 0 && !hideToggleColumn && (
            <ToggleCell
              allowToggle={allowToggle}
              record={record}
              expandedIcon={toggleOptions.expandedIcon}
              collapsedIcon={toggleOptions.collapsedIcon}
              onClick={this.handleRowToggleClick.bind(this, record)}
            />
          )}

          {columnData.map((column, columnIndex) => {
            let { name, children } = column.details;
            let tdStyle = rowStyle ? rowStyle(recordIndex) : {};
            // If supplied, pass record along to children, otherwise just render field value
            if (children) {
              return (
                <td key={columnIndex} style={tdStyle}>
                  <DataCell record={record} recordApi={this.getRecordApi()}>
                    {children}
                  </DataCell>
                </td>
              );
            }
            return (
              <td key={columnIndex} style={tdStyle}>
                {record[name]}
              </td>
            );
          })}
        </tr>
      );
      rows.push(row);

      // Apply any supplied ToggleContent
      toggleOptions.toggleContent.forEach((toggle, toggleIndex) => {
        let { toggleFor, style, className, children } = toggle.details;
        // 1) toggleFor must return true, 2) children must exist,
        // and 3) record.__toggled__ must be true
        if (toggleFor(record) && children && record[__toggled__]) {
          rows.push(
            <ToggleRow
              key={`toggleRow-${toggleIndex}${recordIndex}`}
              colSpan={columnData.length}
              toggleColumnHidden={hideToggleColumn}
              style={style}
              className={className}
              record={record}
              recordApi={this.getRecordApi()}
            >
              {children}
            </ToggleRow>
          );
        }
      });
    });

    return rows;
  };

  getPager = () => {
    let { pagingOptions, datasets } = this.state;
    let {
      handlePrevPage,
      handleNextPage,
      handleSetPage,
      handleSetPageLimit
    } = this;
    return (
      <Pager
        dataset={datasets.outputData}
        pagingOptions={{
          ...pagingOptions,
          handlePrevPage,
          handleNextPage,
          handleSetPage,
          handleSetPageLimit
        }}
      />
    );
  };

  // Reset button
  handleResetButtonClick = e => this.resetQuickTable();
  getResetButton = () => {
    return React.cloneElement(
      this.props.resetButton || (
        <button className="quicktable-button">Reset</button>
      ),
      { type: "button", onClick: this.handleResetButtonClick }
    );
  };

  // Export button
  handleExportButtonClick = e => this.exportData();
  getExportButton = () => {
    return React.cloneElement(
      this.props.exportButton || (
        <button className="quicktable-button">Export</button>
      ),
      { type: "button", onClick: this.handleExportButtonClick }
    );
  };

  // Clear filters button
  handleClearButtonClick = e => this.clearFilters();
  getClearButton = () => {
    return React.cloneElement(
      this.props.clearButton || (
        <button className="quicktable-button">Clear</button>
      ),
      { type: "button", onClick: this.handleClearButtonClick }
    );
  };

  // Message to display when no data to show
  getEmptyMessage = () => {
    let { emptyMessage } = this.props;
    return (
      <div style={{ padding: 10, display: "flex", justifyContent: "center" }}>
        {emptyMessage}
      </div>
    );
  };

  // Render QuickTable Component
  // <pre>{JSON.stringify(this.state.pagingOptions, null, 2)}</pre>
  render() {
    let {
      className,
      style,
      id,
      wrapperClassName,
      wrapperStyle,
      wrapperId,
      resetable,
      clearable,
      onExport,
      pageable,
      pagerOnTop,
      pagerOnBottom
    } = this.props;
    let emptyDataset = this.state.datasets.displayedData.length === 0;
    let limitEnabled = this.state.limitOptions.enable;
    let headings = this.renderTHead();
    let body = this.renderTBody();
    return (
      <div
        id={wrapperId}
        className={wrapperClassName}
        style={wrapperStyle || {}}
      >
        <div className={`quicktable-actions ${className}`}>
          {resetable && this.getResetButton()}
          {clearable && this.getClearButton()}
          {onExport && this.getExportButton()}
        </div>
        {pageable && !limitEnabled && pagerOnTop && this.getPager()}
        <table
          id={id}
          className={className}
          style={style || {}}
        >
          <thead>
            <tr>{headings}</tr>
          </thead>
          <tbody>{body}</tbody>
        </table>
        {emptyDataset && this.getEmptyMessage()}
        {pageable &&
          !limitEnabled &&
          (!pagerOnTop || pagerOnBottom) &&
          this.getPager()}
      </div>
    );
  }
}

QuickTable.propTypes = {
  /** Set to true when using versions of React prior to 16.3.0 */
  legacy: PropTypes.bool,

  /** Dataset to render, can be empty */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** The id prop to be applied to the <table> element */
  id: PropTypes.string,

  /** The className prop to be applied to the <table> element */
  className: PropTypes.string,

  /** The style prop to be applied to the <table> element */
  style: PropTypes.object,

  /** Limits the total amount of rows to display (overrides pagination) */
  limit: PropTypes.number,

  /** Function for hooking into all QuickTable internal events: (tableData) => { ... } */
  onChange: PropTypes.func,

  /** Function for handling export button click event: (data) => { ... } */
  onExport: PropTypes.func,

  /** Element to represent export button. Event handler is auto-applied */
  exportButton: PropTypes.element,

  /** Message when no data is displayed */
  emptyMessage: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Enables/Disables the reset button */
  resetable: PropTypes.bool,

  /** Element to represent reset button. Event handler is auto-applied */
  resetButton: PropTypes.element,

  /** Enables/Disables sorting for entire table (must also be set on DataColumns to sort) */
  sortable: PropTypes.bool,

  /** Represents the Sort Ascending icon */
  ascIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Represents the Sort Descending icon */
  descIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Sets the default column to sort, set to the name of the data record's key */
  defaultSortColumn: PropTypes.string,

  /** Set the default direction to sort, set to "asc" or "desc" */
  defaultSortDirection: PropTypes.string,

  /** Enables/Disables filtering for entire table (must also be set on DataColumns to filter) */
  filterable: PropTypes.bool,

  /** Enables/Disables clear filter button */
  clearable: PropTypes.bool,

  /** Custom filters, each filter should be an object of shape: { dataType, displayText, filter } */
  customFilters: PropTypes.object,

  /** Represents the Filter icon */
  filterIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Element to represent clear filter button. Event handler is auto-applied */
  clearButton: PropTypes.element,

  /** Represents the Row Toggle Collapsed icon */
  collapsedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Represents the Row Toggle Expanded icon */
  expandedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

  /** Enables/Disables ability to toggle more than one row at a time */
  multiToggle: PropTypes.bool,

  /** Hides column with toggle icon, useful when toggling by recordApi method toggleRecord() */
  hideToggleColumn: PropTypes.bool,

  /** Enables/Disables pagination for entire table */
  pageable: PropTypes.bool,

  /** Displays pager on top of table (can be combined with pagerOnBottom) */
  pagerOnTop: PropTypes.bool,

  /** Displays pager on bottom of table (can be combined with pagerOnTop) */
  pagerOnBottom: PropTypes.bool,

  /** Array of per page limits */
  pageLimits: PropTypes.arrayOf(PropTypes.number),

  /** Sets default per page limit */
  perPage: PropTypes.PropTypes.string,

  /** The className prop for wrapper div around entire component */
  wrapperClassName: PropTypes.string,

  /** The style prop for wrapper div around entire component */
  wrapperStyle: PropTypes.object,

  /** Function that determines how to style a row based on the row's index, must return a style object: (rowIndex) => { ... } */
  rowStyle: PropTypes.func
};

export default QuickTable;
