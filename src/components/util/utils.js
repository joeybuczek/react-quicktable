import { __rowId__, __toggled__ } from "./constants";

// =======
// Sorting
// =======
const sortMethods = {
  number: (field, direction) => {
    return direction === "asc"
      ? (a, b) => (+a[field] || 0) - (+b[field] || 0)
      : (a, b) => (+b[field] || 0) - (+a[field] || 0);
  },
  string: (field, direction) => {
    return direction === "asc"
      ? (a, b) => {
          let aa = String(a[field] || "").toLowerCase();
          let bb = String(b[field] || "").toLowerCase();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        }
      : (a, b) => {
          let aa = String(a[field] || "").toLowerCase();
          let bb = String(b[field] || "").toLowerCase();
          return aa > bb ? -1 : aa < bb ? 1 : 0;
        };
  },
  date: (field, direction) => {
    // TODO: HAVENT TESTED DATES YET
    return direction === "asc"
      ? (a, b) => (new Date(a[field]) || 0) - (new Date(b[field]) || 0)
      : (a, b) => (new Date(b[field]) || 0) - (new Date(a[field]) || 0);
  },
  boolean: (field, direction) => {
    const boolToNum = field => !!field ? 1 : 0;
    return direction === "asc"
      ? (a, b) => (boolToNum(a[field]) || 0) - (boolToNum(b[field]) || 0)
      : (a, b) => (boolToNum(b[field]) || 0) - (boolToNum(a[field]) || 0);
  }
};

// Sort arrays of record objects
export const sortDataset = (dataset, field, direction, dataType) => {
  return dataset.sort(sortMethods[dataType](field, direction));
};

// =========
// Data Copy
// =========
export const copyObjectArray = arr => {
  return arr.map(record => ({ ...record }));
};

// ================
// Data Limit Check
// ================
export const canLimit = value => {
  let num = Number(value);
  return !!num && num > 0 && typeof value !== "boolean";
};

// ===============================
// Record-Specific Data Operations
// ===============================
// Data Import: Add all table-specific fields for loaded records
export const appendRowProps = records => {
  return records.map((record, index) => {
    return { ...record, [__rowId__]: index, [__toggled__]: false };
  });
};

// Data Export: Remove all table-specific fields from output records
export const cleanOutputData = records => {
  return records.map(record => {
    let outputRecord = { ...record };
    delete outputRecord[__rowId__];
    delete outputRecord[__toggled__];
    return outputRecord;
  });
};

// ============
// Data Compare
// ============
// Compare two record objects and return true if they are equal
// This method uses the quick-and-dirty JSON.stringify method
function quickDataCompare(record1, record2) {
  let replacer = (key, value) => {
    if (typeof value === "function") return value.toString();
    return value;
  };
  return (
    JSON.stringify(record1, replacer) === JSON.stringify(record2, replacer)
  );
}

// Determine if two datasets are different by checking length and/or contents
// Return true if different, false if same
export const datasetsAreDifferent = (dataset1, dataset2) => {
  let different = false;

  // is length the same or not?
  if (dataset1.length === dataset2.length) {
    let setLength = dataset1.length;

    // For tiny datasets, perform this test
    if (setLength < 50) {
      if (!quickDataCompare(dataset1, dataset2)) {
        different = true;
      }
    }
    // For small datasets, perform this test
    if (setLength >= 50 && setLength < 2000) {
      for (let i = 0; i < setLength; i++) {
        let record1 = dataset1[i];
        let record2 = dataset2[i];
        if (!quickDataCompare(record1, record2)) {
          different = true;
          break;
        }
      }
    }
    // For large datasets, perform this test (TODO: update this test later)
    if (setLength >= 2000) {
      for (let i = 0; i < setLength; i++) {
        let record1 = dataset1[i];
        let record2 = dataset2[i];
        if (!quickDataCompare(record1, record2)) {
          different = true;
          break;
        }
      }
    }
  } else if (dataset1.length !== dataset2.length) {
    different = true;
  }

  return different;
};
