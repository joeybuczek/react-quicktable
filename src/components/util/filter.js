// Filter methods
export const defaultFilterMethods = {
  stringContains: {
    dataType: "string",
    displayText: "Contains",
    filter(fieldValue, matchValue) {
      let regex = RegExp(matchValue, "i");
      return matchValue.toString().trim().length > 0
        ? !!fieldValue.toString().match(regex)
        : true;
    }
  },
  stringDoesNotContain: {
    dataType: "string",
    displayText: "Does not contain",
    filter(fieldValue, matchValue) {
      let regex = RegExp(matchValue, "i");
      return matchValue.toString().trim().length > 0
        ? !fieldValue.toString().match(regex)
        : true;
    }
  },
  stringEquals: {
    dataType: "string",
    displayText: "Equals (case insensitive)",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? fieldValue.toString().toLowerCase() ===
            matchValue.toString().toLowerCase()
        : true;
    }
  },
  stringStrictlyEquals: {
    dataType: "string",
    displayText: "Equals (case sensitive)",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? fieldValue.toString() === matchValue.toString()
        : true;
    }
  },
  numberEquals: {
    dataType: "number",
    displayText: "Equals ==",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) === Number(matchValue)
        : true;
    }
  },
  numberDoesNotEqual: {
    dataType: "number",
    displayText: "Does not equals !=",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) !== Number(matchValue)
        : true;
    }
  },
  numberGreaterThan: {
    dataType: "number",
    displayText: "Greater than >",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) > Number(matchValue)
        : true;
    }
  },
  numberGreaterThanOrEqualTo: {
    dataType: "number",
    displayText: "Greater than or equal to >=",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) >= Number(matchValue)
        : true;
    }
  },
  numberLessThan: {
    dataType: "number",
    displayText: "Less than <",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) < Number(matchValue)
        : true;
    }
  },
  numberLessThanOrEqualTo: {
    dataType: "number",
    displayText: "Less than or equal to <=",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? Number(fieldValue) <= Number(matchValue)
        : true;
    }
  },
  dateEquals: {
    dataType: "date",
    displayText: "Equals =",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? new Date(fieldValue) <= new Date(matchValue) &&
            new Date(fieldValue) >= new Date(matchValue)
        : true;
    }
  },
  dateBefore: {
    dataType: "date",
    displayText: "Before <",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? new Date(fieldValue) < new Date(matchValue)
        : true;
    }
  },
  dateBeforeOrOn: {
    dataType: "date",
    displayText: "Before or on <=",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? new Date(fieldValue) <= new Date(matchValue)
        : true;
    }
  },
  dateAfter: {
    dataType: "date",
    displayText: "After >",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? new Date(fieldValue) > new Date(matchValue)
        : true;
    }
  },
  dateAfterOrOn: {
    dataType: "date",
    displayText: "After or on >=",
    filter(fieldValue, matchValue) {
      return matchValue.toString().trim().length > 0
        ? new Date(fieldValue) >= new Date(matchValue)
        : true;
    }
  },
  booleanIsTrue: {
    dataType: "boolean",
    displayText: "Is true",
    filter(fieldValue, matchValue) {
      return !!fieldValue === true;
    }
  },
  booleanIsFalse: {
    dataType: "boolean",
    displayText: "Is false",
    filter(fieldValue, matchValue) {
      return !!fieldValue === false;
    }
  }
};

export const applyFiltersToDataset = (dataset, filtersToApply) => {
  if (filtersToApply.length > 0) {
    filtersToApply.forEach(filterToApply => {
      let { name, method, arg } = filterToApply;
      dataset = !!method
        ? dataset.filter(record => method(record[name], arg))
        : dataset;
    });
  }
  return dataset;
};
