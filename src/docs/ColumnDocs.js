import React from "react";
import "../docs-styles.css";

// Column Docs
const c_code_1 = `const myDataSet = [
  { Name: "Leonardo", Title: "Artist" },
  { Name: "David", Title: "Musician" },
  { Name: "Joey", Title: "Developer" }
];

...
  <QuickTable data={myDataset} />
    <Column name="Name" />
    <Column name="Title" />
  </QuickTable>
...`;
const c_code_2 = `...
  <QuickTable data={myDataset} />
    <Column name="Title" />
    <Column name="Name" />    
  </QuickTable>
...`;
const c_code_3 = `...
  <QuickTable data={pastClaims}>
    <Column name="claimID" heading="Claim Number" />
    <Column name="claimDt" heading="Date" />
    <Column name="claimAmt" heading={<i>Amount</i>} />
  </QuickTable>
...`;
const c_code_4 = `...
  <QuickTable data={pastClaims} sortable>
    <Column name="claimID" heading="Claim Number" sortable dataType="string" />
    <Column name="claimDt" heading="Date" sortable dataType="date" />
    <Column name="claimAmt" heading="Amount" sortable dataType="number" />
  </QuickTable>
...`;
const c_code_5 = `...
  <QuickTable data={pastClaims} sortable defaultSortColumn="claimDt" defaultSortDirection="desc">
    <Column name="claimID" heading="Claim Number" sortable dataType="string" />
    <Column name="claimDt" heading="Date" sortable dataType="date" />
    <Column name="claimAmt" heading="Amount" />
  </QuickTable>
...`;
const c_code_6 = `...
  <QuickTable data={pastClaims} filterable>
    <Column name="claimID" heading="Claim Number" filterable dataType="string" />
    <Column name="claimDt" heading="Date" filterable dataType="date" />
    <Column name="claimAmt" heading="Amount" filterable dataType="number" />
  </QuickTable>
...`;
const c_code_7 = `{
  filterName: {
    dataType:    string;     // "string", "number", or "date"
    displayText: string;     // "text to display in filter menu"
    filter:      function;   // (fieldValue, matchValue): boolean => { ... } 
  },
  anotherFilterName: { ... } // can add many, but names must be unique
}`;
const c_code_8 = `const qtClaimFilter = {
  typeQTClaim: {
    dataType: "string",
    displayText: "QT-Type Claim",
    filter(fieldValue, matchValue) {
      let regex = RegExp(matchValue, "i");
      return matchValue.trim().length > 0
        ? (fieldValue.indexOf("QT00") === 0) && (!!fieldValue.match(regex))
        : true; // Setting true for a pass-through accounts for no value in input box
    }
  }
};

...
  <QuickTable data={pastClaims} filterable customFilters={qtClaimFilter}>
    <Column name="claimID" heading="Claim Number" filterable dataType="string" />
    <Column name="claimDt" heading="Date" />
    <Column name="claimAmt" heading="Amount" />
  </QuickTable>
...`;
const c_code_9 = `...
  <QuickTable data={myDataset} />
    <Column name="LastName" heading="Name" sortable dataType="string">
      {record => <strong>{record.LastName}, {record.FirstName}</strong>}
    </Column>
    <Column name="Title" />
  </QuickTable>
...`;

const ColumnDocs = props => {
  return (
    <div>
      <h3 className="h3_style">Column Component</h3>
      <div className="content_style">
        <p>
          Columns are implemented as children within the <b>QuickTable</b>{" "}
          component. This makes ordering easier, along with providing a visual
          model that is simple to decipher.
        </p>
        <p>
          The <b>name</b> prop for each column of data corresponds to the key in
          the record object. In other words, if you need to display a column for
          the "Title" field in each record, you would set the value of the{" "}
          <b>name</b> prop to "Title".
        </p>
        <pre>{c_code_1}</pre>
        <p>
          A column does not have to correspond to a key/value pair in the record,
          as custom columns can be created with different content. However, a row
          for each record in the set will be rendered regardless of the names of
          the columns defined or the content displayed by the columns. In other
          words, if there are 20 records in the dataset, 20 rows will be rendered.
        </p>
        <p>
          The <b>Column</b> component does not require any props to be passed to
          it in order to render content, however in that case it would need to be
          passed content as a child instead (see the Custom Content section).
        </p>
        <br />
        <h4 className="h4_style">Ordering Columns</h4>
        <p>
          Ordering the columns is as simple as changing the order in which the{" "}
          <b>Column</b> components are defined. Going off of the previous code
          example, shown below is the new order of the table headings of "Title",
          then "Name":
        </p>
        <pre>{c_code_2}</pre>
        <br />
        <h4 className="h4_style">Column Headings</h4>
        <p>
          By default, if the <b>Column</b> component is passed a <b>name</b> prop,
          it will use that value to also display as the heading for that column.
          If you need to display something different - perhaps to change the
          casing - you can supply a <b>heading</b> prop to set the value. The{" "}
          <b>heading</b> prop can accept either a string or JSX:
        </p>
        <pre>{c_code_3}</pre>
        <p>
          Additionally, column headings can be styled by providing the{" "}
          <b>Column</b> component either a <b>className</b> or <b>style</b> prop,
          which will be applied to the underlying <b>th</b> element. For styling
          the content in each of the cells rendered in the column, see the Custom
          Content section below.
        </p>
        <br />
        <h4 className="h4_style">Sorting</h4>
        <p>
          Sorting is accomplished by adding the <b>sortable</b> prop to both the
          <b>QuickTable</b> component, and on each of the <b>Column</b> components
          where you want sorting to be enabled. When setting a <b>Column</b> to be
          sortable, you must also provide a <b>dataType</b> prop to designate the
          type of sorting algorithm to be used by <b>QuickTable</b>. The{" "}
          <b>dataType</b> prop takes a string of one of the following values:
          "string", "number", or "date". When combined with filtering, the{" "}
          <b>dataType</b> prop handles the type for both.
        </p>
        <pre>{c_code_4}</pre>
        <p>
          It is important to note that the sort algorithm will use the record
          field value that matches the value of the <b>name</b> prop being set on
          that <b>Column</b>.
        </p>
        <p>
          A default sort column and direction can be designated by providing{" "}
          <b>QuickTable</b> the following props: <b>defaultSortColumn</b> and{" "}
          <b>defaultSortDirection</b>. The <b>defaultSortColumn</b> takes a string
          that is equal to the <b>name</b> prop value for that column. The{" "}
          <b>defaultSortDirection</b> takes a string of one of the following
          values: "asc" or "desc".
        </p>
        <p>
          The below example will pre-sort the pastClaims dataset in the Date
          column in descending order:
        </p>
        <pre>{c_code_5}</pre>
        <br />
        <h4 className="h4_style">Filtering</h4>
        <p>
          Filtering is accomplished by adding the <b>filterable</b> prop to both
          the <b>QuickTable</b> component, and on each of the <b>Column</b>{" "}
          components where you want filtering to be enabled. When setting a{" "}
          <b>Column</b> to be filterable, you must also provide a <b>dataType</b>{" "}
          prop to designate the type of filtering algorithm to be used by{" "}
          <b>QuickTable</b>. The <b>dataType</b> prop takes a string of one of the
          following values: "string", "number", or "date". When combined with
          sorting, the <b>dataType</b> prop handles the type for both.
        </p>
        <pre>{c_code_6}</pre>
        <p>
          There are a number of built-in filtering algorithms for each of the data
          types, however you can also supply your own. This is accomplished via
          the <b>customFilters</b> prop. This prop accepts an object with the
          following shape:
        </p>
        <pre>{c_code_7}</pre>
        <p>
          Each filter method must have a unique name, and are represented as the
          first nested property in the customFilters object. Each filter must
          contain three properties: 1) <b>dataType</b>, which corresponds to the{" "}
          <b>dataType</b> prop on <b>Column</b>, 2) <b>displayText</b>, which is
          the text to display in the filter menu dropdown, and 3) <b>filter</b>,
          which is a function that accepts two arguments; The first argument will
          be the value of the cell currently being filtered, and the second being
          the value of the filter menu input box where the user enters the value
          they want to filter on. You can provide as many filter methods as you
          need, however the names of the filters must be valid key name values in
          JavaScript, and they must be unique.
        </p>
        <p>
          Below is an example of a custom filter being added to a{" "}
          <b>QuickTable</b>:
        </p>
        <pre>{c_code_8}</pre>
        <br />
        <h4 className="h4_style">Custom Content</h4>
        <p>
          Cells in <b>QuickTable</b> can also be customized for additional
          styling, or as mentioned previously, to display content other than the
          field value in the record. This is accomplished by passing a child to
          the <b>Column</b> component. Children of a <b>Column</b> must be
          implemented as a function (similar to the render props pattern), which
          accepts two arguments: 1) the record for the row currently being
          referenced, and 2) a recordApi object (see the Record API section for
          more information).
        </p>
        <p>
          The below example will render the field values for the heading "Name" in
          a custom element (while being able to sort on the "LastName" field):
        </p>
        <pre>{c_code_9}</pre>
      </div>
    </div>
  );
};

export default ColumnDocs;