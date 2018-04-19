// Return the current page of records
export const paginateDataset = (dataset, pagingOptions) => {
  let { firstRecord, perPage } = pagingOptions;
  return dataset.slice(firstRecord, firstRecord + perPage);
};

// Calculate total pages
export const calcTotalPages = (dataset, pagingOptions) => {
  return Math.ceil(dataset.length / pagingOptions.perPage);
};

// Calculate page numbers to display in dropdown
export const calcPageNumbers = totalPages => {
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

// Calculate range to display (ie: 1 - 10 of 20)
export const calcDisplayRange = (dataset, pagingOptions) => {
  let { firstRecord, perPage } = pagingOptions;
  let totalRecords = dataset.length;
  let fromRecord = totalRecords > 0 ? firstRecord + 1 : 0;
  let toRecord;
  if (totalRecords > 0) {
    if (fromRecord + perPage > totalRecords) {
      toRecord = totalRecords;
    } else if (perPage < totalRecords) {
      toRecord = fromRecord + perPage - 1;
    } else {
      toRecord = totalRecords;
    }
  } else {
    toRecord = 0;
  }
  return `${fromRecord} - ${toRecord} of ${totalRecords}`;
};
