import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import QuickTableDocs from "./QuickTableDocs";
import ColumnDocs from "./ColumnDocs";
import ToggleContentDocs from "./ToggleContentDocs";
import RecordApiDocs from "./RecordApiDocs";
import "../docs-styles.css";

// Local styles
const h3_style = {
  marginTop: '40px',
  padding: "10px 5px",
  backgroundColor: "#dde8ee"
};
const content_style = {
  padding: '10px'
};

export default class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({route: window.location.hash.substr(1)})
    })
  }

  render() {
    const {route} = this.state;
    const component = route ? componentData.filter( component => component.name === route)[0] : componentData[1];

    return (
      <div className="docs-div">
        <QuickTableDocs />
        <hr />
        <ColumnDocs />
        <hr />
        <ToggleContentDocs />
        <hr />
        <RecordApiDocs />
        <hr />
        <h3 className="h3_style">All Component Props</h3>
        <div className="content_style">
          <Navigation components={componentData.map(component => component.name)} />
          <ComponentPage component={component} />
        </div>
      </div>
    )
  }
}