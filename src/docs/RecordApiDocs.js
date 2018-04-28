import React from "react";
import "../docs-styles.css";

// Record API Docs
const ra_code_1 = `const dataset = [
  { Name: "Leonardo", Title: "Artist" },
  { Name: "David", Title: "Musician" },
  { Name: "Joey", Title: "Developer" }
]

...
  <QuickTable data={dataset} onExport={data => updateForm(data)}>
    <Column name="Name" />
    <Column name="Title">
      {(record, { updateRecord }) => (
        <input value={record.Title} onChange={e => {
          updateRecord({ ...record, Title: e.target.value });
        }} />
      )}
    <Column>
  </QuickTable>
...`;
const ra_code_2 = `...
  <QuickTable data={dataset} onExport={data => exportToPDF(data)}>
    <Column name="Name" />
    <Column name="Title />
    <Column>
      {(record, { removeRecord }) => (
        <button onClick={e => removeRecord(record)}>X</button>
      )}
    <Column>
  </QuickTable>
...`;
const ra_code_3 = `...
  <QuickTable data={dataset} hideToggleColumn>
    <Column name="Name" />
    <Column name="Title />
    <Column>
      {(record, { toggleRecord }) => (
        <button onClick={e => 
          // Toggle the row & update the ViaToggle property:
          toggleRecord({ ...record, ViaToggle: true });
        }>Toggle Row</button>
      )}
    <Column>
    <ToggleContent toggleFor{record => true}>
      {record => <DetailView record={record} />}
    </ToggleContent>
  </QuickTable>
...`;

const RecordApiDocs = props => {
  return (
    <div>
      <h3 className="h3_style">Record API</h3>
      <div className="content_style">
        <p>
          The <b>QuickTable</b> component allows for some record manipulation,
          which is called the <b>Record API</b> interface. When rendering custom
          content within a <b>Column</b> or <b>ToggleContent</b> component, that
          content is implemented as children using a function (similar to the
          render props pattern). These functions accept two arguments: 1) the
          record currently being referenced for that row, and 2) a{" "}
          <b>recordApi</b> object.
        </p>
        <p>
          The <b>recordApi</b> object has properties on it which are methods that
          can be used for manipulating the dataset currently loaded in the{" "}
          <b>QuickTable</b> component. These are handy when you need to, for
          example, implement an input element - or even an entire form - for that
          row's data.
        </p>
        <p>
          The current methods available on the <b>recordApi</b> object are as
          follows:
        </p>
        <ul>
          <li>
            <b>updateRecord</b>: <i>Function</i>; Updates the record for the
            current row
          </li>
          <li>
            <b>removeRecord</b>: <i>Function</i>; Removes the record from the
            loaded dataset
          </li>
          <li>
            <b>toggleRecord</b>: <i>Function</i>; Updates the record's toggled 
            status for the current row, while also allowing other properties to
            be updated like <b>updateRecord</b> does
          </li>
        </ul>
        <p>
          It is important to note that these methods <i>will not</i> affect the
          original array of data that is passed to the <b>QuickTable</b>{" "}
          component.
        </p>
        <br />
        <h4 className="h4_style">Updating Records</h4>
        <p>
          The <b>updateRecord()</b> method can be used for quickly updating the
          fields of a record for a particular row. This is useful when utilizing
          the <b>QuickTable</b> component as part of a form. The{" "}
          <b>updateRecord()</b> method accepts only one argument: the record
          object for that row. This record is easily accessible inside the child
          function for both the
          <b>Column</b> and <b>ToggleContent</b> components.
        </p>
        <p>
          Below is an example of how to capture, edit, and update the record for a
          row using a simple text input element:
        </p>
        <pre>{ra_code_1}</pre>
        <p>
          In the above code, the value of the input box is set to the value of the
          Title field for the given record. When the value is changed by the user,
          the updateRecord method is passed a new object containing all the fields
          of the record, along with the new value of to the Title field being set
          to the value of the input box. The record is updated automatically
          within the dataset, and the table re-renders the appropriate row's data.
        </p>
        <p>
          The <b>toggleRecord</b> method can be used for collapsing and expanded 
          the ToggleContent component for the given record's row. Simply pass the
          record object into the method. In addition, this method can be used just
          like <b>updateRecord</b> in that it will update any other property on the
          record that needs to be updated at the same time the row is toggled.
        </p>
        <p>
          Below is an example of using <b>toggleRecord</b> to toggle the row's content
          via a button element (and hiding the toggle icon row via <b>hideToggleColumn</b> prop):
        </p>
        <pre>{ra_code_3}</pre>
        <br />
        <h4 className="h4_style">Removing Records</h4>
        <p>
          The <b>removeRecord()</b> method can be used for quickly removing a
          record from the currently loaded dataset. This is useful when, for
          example, before passing the table data to another part of the
          application, any unwanted records are removed prior to the export. The{" "}
          <b>removeRecord()</b> method accepts one argument: the record of the
          current row being referenced.
        </p>
        <p>
          Below is an example of utilizing this method to remove a record with a
          button in a column with custom content:
        </p>
        <pre>{ra_code_2}</pre>
      </div>
    </div>
  );
};

export default RecordApiDocs;