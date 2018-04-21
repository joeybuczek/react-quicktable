import { copyObjectArray, sortDataset } from "./utils";
import { applyFiltersToDataset } from "./filter";
import { paginateDataset } from "./pagination";

// ---------------------------------------------------
// Given the supplied dataset and requests object,
// process accordingly and return a list of datasets
// to be updated in the component state.
// The ternary operations below provide pass-through
// for any portions of the pipeline that are not used.
// ---------------------------------------------------

export const processDatasets = (dataset, requests) => {
  // The requests object is constructed from state and
  // eventHandler data prior to this method call

  // Apply any recordApi updates
  /*
    recordApiOptions = {
      method: the recordApi method passed in (updateRecord, etc)
      record: the record being manipulated
    }
  */
  let { recordApiOptions } = requests;
  let recordApiData =
    recordApiOptions.method && recordApiOptions.record
      ? recordApiOptions.method(dataset, recordApiOptions.record)
      : copyObjectArray(dataset);

  // Apply any filters
  /*
    filterOptions = {
      enable: boolean
      filterPipeline: [ array of filters to be processed
        {
          column: the field in the records to filter on
          method: the filter method passed in
          dataType: the type of data to filter (string = default, number, date)
        }, ...
      ]        
    }
  */
  let { filterOptions } = requests;
  let filteredData = filterOptions.enable
    ? applyFiltersToDataset(recordApiData, filterOptions.filtersToApply)
    : copyObjectArray(recordApiData);

  // Apply any sorting and save as "output" data
  /*
    sortOptions = {
      enable: boolean
      column: the field in the records to sort on (or first field in first record of set)
      direction: the direction to sort (asc = default, desc)
      dataType: the type of data to sort (string = default, number, date)
    }
  */
  let { sortOptions } = requests;
  let outputData = sortOptions.enable
    ? sortDataset(
        copyObjectArray(filteredData),
        sortOptions.column,
        sortOptions.direction,
        sortOptions.dataType
      )
    : copyObjectArray(filteredData);

  // Apply any limits imposed on data
  /*
    limitOptions = {
      enable: boolean
      limit: number of records to display before any paging
    }
  */
  let { limitOptions } = requests;
  let limitedData = limitOptions.enable
    ? copyObjectArray(outputData.slice(0, limitOptions.limit))
    : copyObjectArray(outputData);

  // ---------------------------------------------------
  // The following portion extracts out the data that is
  // to be used for display purposes only.
  // ---------------------------------------------------

  // Apply any paging and save as "displayed" data (cannot page on limit dataset result)
  /*
    pagingOptions = {
      enable: boolean
      firstRecord: index of first record to show
      lastRecord: index of last record to show
    }
  */
  let { pagingOptions } = requests;
  let displayedData =
    pagingOptions.enable && !limitOptions.enable
      ? copyObjectArray(paginateDataset(outputData, pagingOptions))
      : copyObjectArray(limitedData);

  return {
    loadedData: recordApiData,
    outputData: limitedData,
    displayedData
  };
};
