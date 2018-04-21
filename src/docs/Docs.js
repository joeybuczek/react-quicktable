import React from 'react';
import Props from "./Props";
import componentData from '../../config/componentData';
import TabContainer from "./TabContainer";
import QuickTableDocs from "./QuickTableDocs";
import ColumnDocs from "./ColumnDocs";
import ToggleContentDocs from "./ToggleContentDocs";
import RecordApiDocs from "./RecordApiDocs";
import "../docs-styles.css";
import { QuickTable, Column, ToggleContent } from "../components";

const Docs = props => {
  const { Tab } = TabContainer;
  const quickTableComponent = componentData.filter(c => c.name === "QuickTable")[0];
  const columnComponent = componentData.filter(c => c.name === "Column")[0];
  const toggleContentComponent = componentData.filter(c => c.name === "ToggleContent")[0];

  return (
    <div className="docs-div">
      <h1>QuickTable Documentation</h1>
      <div className="content_style">
      <p>
        QuickTable is made up of three components: QuickTable, Column, and ToggleContent. 
        The first two are required for rendering, while ToggleContent is optional. Below 
        you'll find the documentation for implementing each component, along with a section 
        on the Record API interface (a quick way to manipulate table content). 
      </p>
      <p>
        The QuickTable component uses features available in React 16.3.0 and higher. 
        For use with prior versions, use the temporary <b>legacy</b> prop (see below 
        in QuickTable props section). When using React 16.3.0 or higher, warnings in the 
        developer console will display for 0.1.x versions of QuickTable in regards to 
        the legacy lifecycle method used, however in the next major release legacy 
        methods will be renamed to their "unsafe" names.
      </p>
      </div>
      <TabContainer>
        <Tab name="QuickTable">
          <QuickTableDocs />
          <Props props={quickTableComponent.props} name="QuickTable" />
        </Tab>
        <Tab name="Column">
          <ColumnDocs />
          <Props props={columnComponent.props} name="Column" />
        </Tab>
        <Tab name="ToggleContent">
          <ToggleContentDocs />
          <Props props={toggleContentComponent.props} name="ToggleContent" />
        </Tab>
        <Tab name="Record API">
          <RecordApiDocs />
        </Tab>
      </TabContainer>
    </div>
  );
}

export default Docs;