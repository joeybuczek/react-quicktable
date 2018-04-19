import React from 'react';
import PropTypes from 'prop-types';
import Props from './Props';

const ComponentPage = ({component}) => {
  const {name, description, props} = component;

  return (
    <div className="componentpage">
      <h2>{name}</h2>
      <p>{description}</p>

      <h3>Props</h3>
      {
        props ?
        <Props props={props} /> :
        "This component accepts no props."
      }
    </div>
  )
};

ComponentPage.propTypes = {
  component: PropTypes.object.isRequired
};

export default ComponentPage;