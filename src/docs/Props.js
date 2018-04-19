import React from 'react';
import PropTypes from 'prop-types';
import { QuickTable, Column } from 'react-quicktable';

const Props = ({props}) => {
  let dataset = Object.keys(props).map(key => {
    return { 
      Name: key, 
      Description: props[key].description ,
      Type: props[key].type.name,
      DefaultValue: props[key].defaultValue ? props[key].defaultValue.value : '',
      Required: props[key].required ? "X" : ""
    };
  })
  return (
    <div>
      <QuickTable data={dataset} className="quicktable-cool">
        <Column name="Name" />
        <Column name="Type" />
        <Column name="Required" />
        <Column name="Description" />
      </QuickTable>
    </div>
  )
}

Props.propTypes = {
  props: PropTypes.object.isRequired
};

export default Props;