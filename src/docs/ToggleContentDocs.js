import React from "react";
import "../docs-styles.css";

// ToggleContent Docs
const t_code_1 = `import { QuickTable, Column, ToggleContent } from "react-quicktable";

...
  <QuickTable data={dataset}>
    <Column name="Name" />
    <Column name="Title" />
    <ToggleContent toggleFor={record => record.Title === 'Developer'}>
      {record => <p>{record.Name} is a developer!</p>}
    </ToggleContent>
  </QuickTable>
...`;
const t_code_2 = `const dataset = [
  { Name: "Leonardo", Talents: [{ Talent: "Drawing" }, { Talent: "Painting" }] },
  { Name: "David", Talents: [{ Talent: "Singing" }, { Talent: "Acting" }] }
]

...
  <QuickTable data={dataset}>
    <Column name="Name" />
    <ToggleContent toggleFor={record => record.Talents.length > 0}>
      {record => (
        <QuickTable data={record.Talents}>
          <Column name="Talent" />
        </QuickTable>
      )}
    </ToggleContent>
  </QuickTable>
...`;

const ToggleContentDocs = props => {
  return (
    <div>
      <h3 className="h3_style">ToggleContent Component</h3>
      <div className="content_style">
        <p>
          Rows within the <b>QuickTable</b> component have the ability to be
          expanded and collapsed in order to show or hide additional data related
          to the data for that row. This is accomplished by using the{" "}
          <b>ToggleContent</b> component, which must be implemented as a child of
          the <b>QuickTable</b> component.
        </p>
        <p>
          The <b>ToggleContent</b> component takes a prop called <b>toggleFor</b>,
          which accepts a function that gets passed one argument - the record
          currently being rendered - and must return a boolean. Returning true
          will allow that row to be "toggled" between it's expanded and collapsed
          state.
        </p>
        <p>
          The content to be rendered, when expanded, is passed as a child of{" "}
          <b>ToggleContent</b>, and is implemented as a function which gets passed
          two arguments: 1) the record being rendered, and 2) a recordApi object
          (see <b>Record API</b> section for more information).
        </p>
        <p>Below is an example of basic usage:</p>
        <pre>{t_code_1}</pre>
        <p>
          The above example would allow any row where the "Title" field of that
          record is equal to "Developer" the ability to be expanded and collapsed.
          When expanded, the text in the <b>p</b> element would render to the view
          directly underneath that row.
        </p>
        <p>
          Only one row at a time can be expanded and collapsed unless the{" "}
          <b>QuickTable</b> component is passed the prop <b>multiToggle</b> with a
          value of <b>true</b>.
        </p>
        <p>
          More than one <b>ToggleContent</b> component can be implemented, where
          each <b>toggleFor</b> prop can hold a different - or even the same -
          function. If two or more <b>ToggleContent</b> components use the same
          function, then the content will be displayed in the order that the{" "}
          <b>ToggleContent</b> components are defined within <b>QuickTable</b>.
        </p>
        <br />
        <h4 className="h4_style">Styling Toggled Content</h4>
        <p>
          The <b>ToggleContent</b> component accepts both a <b>className</b> and{" "}
          <b>style</b> prop for basic styling that surrounds the content when
          expanded. The expanded content can be any valid React content, so any
          further styling can be applied directly on that content as it normally
          would be.
        </p>
        <br />
        <h4 className="h4_style">Advanced ToggleContent</h4>
        <p>
          Since the expanded content can be practically anything, a lot of
          advanced use-cases can be implemented. For example, since the child
          function of <b>ToggleContent</b> receives both the row's record and the
          recordApi object, a form for editing the row's data can be easily
          created. Additionally, you can nest other <b>QuickTable</b> components
          as well.
        </p>
        <p>
          Below is an example where one of the fields in the dataset's records
          contains an array of additional records, and is passed to a nested
          table.
        </p>
        <pre>{t_code_2}</pre>
        <p>
          When one of the rows in the above example is expanded, the user will see
          a table with a column of "Talents" displayed.
        </p>
        <p>
          For a live demo of an advanced use case with ToggleContent, click below:{" "}
        </p>
        <a href="https://codesandbox.io/s/lpy3nw6xl7" target="_blank" rel="noopener noreferrer">
          <img alt="QuickTable & ToggleContent Demo" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
        </a>
      </div>
    </div>
  );
};

export default ToggleContentDocs;