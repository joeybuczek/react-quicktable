import React from 'react';
import PropTypes from 'prop-types';
import { QuickTable, Column } from 'react-quicktable';

const Props = ({props, name}) => {
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
      <h3 className="h3_style">{name} Props</h3>
      <div className="content_style"> 
        <QuickTable data={dataset} sortable className="quicktable-cool">
          <Column name="Name" sortable dataType="string" />
          <Column name="Type" />
          <Column name="Required" />
          <Column name="Description" />
        </QuickTable>
      </div>
    </div>
  )
}

Props.propTypes = {
  props: PropTypes.object.isRequired
};

export default Props;