import { __rowId__ } from "./constants";

// Update a record in the supplied dataset
export const updateRecord = (data, updateRecord) => {
  return data.map(record => {
    if (record[__rowId__] === updateRecord[__rowId__]) {
      return updateRecord;
    }
    return record;
  });
};

// Remove a record from the supplied dataset
export const removeRecord = (data, removeRecord) => {
  return data.filter(record => record[__rowId__] !== removeRecord[__rowId__]);
};
