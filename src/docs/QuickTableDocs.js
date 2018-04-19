import React from "react";
import "../docs-styles.css";

// QuickTable Docs
const qt_code_1 = `import { QuickTable, Column } from "react-quicktable"
const myDataSet = [
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
const qt_code_2 = `<table>
  <thead>
    <tr>
      <th> ... </th>
      <th> ... </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> ... </td>
      <td> ... </td>
    </tr>
  </tbody>
</table>`;
const qt_code_3 = `// Assumes bootstrap.css is loaded...

...
  <QuickTable data={myDataset} className="table table-responsive" />
    <Column name="Name" />
    <Column name="Title" />
  </QuickTable>
...`;
const qt_code_theme = `<QuickTable className="quicktable" ... >         // basic styles
<QuickTable className="quicktable-neutral" ... > // neutral greys
<QuickTable className="quicktable-cool" ... >    // blue-ish hues
<QuickTable className="quicktable-warm" ... >    // orange-ish hues
`;
const qt_code_4 = `...
  <QuickTable data={myDataset} pageable />
    <Column name="Name" />
    <Column name="Title" />
  </QuickTable>
...`;

const QuickTableDocs = props => {
  return (
    <div>
      <h3 className="h3_style">QuickTable Component</h3>
      <div className="content_style">
        <p>
          The <b>QuickTable</b> component was built with simplicity of use in
          mind, while also providing useful features such as sorting, filtering,
          and pagination. This component is aimed towards quickly setting up and
          displaying tables of data where the dataset is typically of a smaller
          size.
        </p>
        <p>
          Typical use-cases for implementing <b>QuickTable</b> would include
          displaying and sorting a dataset returned from an API call, or to
          display a small table of data in a form. However, more complex use
          scenarios are possible as well. See the <b>ToggleContent</b> component
          section for some examples.
        </p>
        <br />
        <h4 className="h4_style">Implementing QuickTable</h4>
        <p>
          To implement, import the <b>QuickTable</b> and <b>Column</b> components
          from the module, then declare them in your render function. The{" "}
          <b>QuickTable</b> is the parent, and all declared <b>Column</b>{" "}
          components are its children. Below is a simple example of a table that
          would display a "Name" and "Title" column, and a row for each of the
          three records:
        </p>
        <pre>{qt_code_1}</pre>
        <p>
          The <b>name</b> prop for each column of data corresponds to the key in
          the record object. In other words, if you need to display a column for
          the "Title" field in each record, you would set the value of the{" "}
          <b>name</b> prop to "Title".
        </p>
        <p>
          A column does not have to correspond to a key/value pair in the record,
          as custom columns can be created with different content. However, a row
          for each record in the set will be rendered regardless of the names of
          the columns defined. See the <b>Column</b> component section for all the
          details related to columns within the table.
        </p>
        <br />
        <h4 className="h4_style">Styling QuickTable</h4>
        <p>
          The <b>QuickTable</b> component has custom classes built into it, and
          comes with some pre-made themes for quickly styling the table elements.
          To use these, simply import the <b>"quicktable-styles.css"</b> file and
          add one of the following classes to the <b>className</b> prop of the{" "}
          <b>QuickTable</b> component:
        </p>
        <pre>{qt_code_theme}</pre>
        <p>
          Before applying any custom or 3rd party styles to <b>QuickTable</b>, it
          is important to note that the rendered DOM elements adhere to the proper
          table element HTML standards. For example, each <b>QuickTable</b> will
          render similarly to the below (footers are not implemented at this
          time):
        </p>
        <pre>{qt_code_2}</pre>
        <p>
          Since <b>QuickTable</b> follows the above pattern, any CSS framework or
          custom classes that adhere to the standard will properly style the{" "}
          <b>QuickTable</b>. In addition, you can also add a <b>className</b> and{" "}
          <b>style</b> prop, which will be applied on the <b>table</b> element.
          This is so that you can take advantage of frameworks such as Bootstrap,
          where you simply need to add a "table" class to the <b>table</b>{" "}
          element.
        </p>
        <p>
          The below example uses Bootstrap CSS to style the <b>QuickTable</b>:
        </p>
        <pre>{qt_code_3}</pre>
        <p>
          In addition to the <b>className</b> and <b>style</b> props, there are
          also <b>wrapperClassName</b> and <b>wrapperStyle</b> props, which get
          applied to a wrapper div surrounding the root table element. These allow
          for adding classes and styles to easily re-position the{" "}
          <b>QuickTable</b> in the view.
        </p>
        <br />
        <h4 className="h4_style">Styling QuickTable Elements</h4>
        <p>
          There are many elements within <b>QuickTable</b> that can also be
          styled, such as the sort icons, toggle icons, and the various action
          buttons. Please visit the link below to see a live example of how to use
          all props relating to styles for the QuickTable elements:{" "}
          <a>codesandbox link</a>
        </p>
        <br />
        <h4 className="h4_style">Pagination</h4>
        <p>
          Implementing pagination is as simple as passing the <b>pageable</b> prop
          to the <b>QuickTable</b> component:
        </p>
        <pre>{qt_code_4}</pre>
        <p>
          By default, without any other options, this is enough to rending the
          paging elements, along with a list of records-per-page limits. You may,
          however, want to customize this as well. The following props are
          provided for this purpose:
        </p>
        <ul>
          <li>
            <b>pageLimits</b>: <i>Array</i>; An array of numbers for determining
            records-per-page limits
          </li>
          <li>
            <b>perPage</b>: <i>Number</i>; The default page limit value to be set
          </li>
          <li>
            <b>pagerOnTop</b>: <i>Boolean</i>; Places the paging elements above
            the table
          </li>
          <li>
            <b>pagerOnBottom</b>: <i>Boolean</i>; Places the paging elements below
            the table. This is the default setting, and can be combined with{" "}
            <b>pagerOnTop</b> to place them on the top and bottom.
          </li>
        </ul>
        <br />
        <h4 className="h4_style">QuickTable Actions and Events</h4>
        <p>
          There are several props related to additional actions and events that
          may occur with <b>QuickTable</b> component, and they are as follows:
        </p>
        <ul>
          <li>
            <b>resetable</b>: <i>Boolean</i>; Adds a button above the table that
            allows the user to reset the table to the state it was in when first
            rendered with a new dataset (including sorting, filtering, and paging
            options)
          </li>
          <li>
            <b>clearable</b>: <i>Boolean</i>; Adds a button above the table that
            allows the user to clear all currently applied filters (does not
            affect sorting)
          </li>
          <li>
            <b>onExport</b>: <i>Function</i>; Gets passed the current state of the
            dataset, and adds a button above the table for the user to execute
            this function
          </li>
          <li>
            <b>onChange</b>: <i>Function</i>; Gets passed the current state of the
            dataset with the component upon every change that occurs, such as
            after each applied filter or recordApi method call (useful for
            dispatching actions with a state management solution, or for
            triggering other events in the application)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuickTableDocs;