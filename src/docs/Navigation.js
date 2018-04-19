import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({components}) => {
  return (
    <ul className="navigation">
      <li><a href={`#QuickTable`}>QuickTable</a></li>
      <li><a href={`#Column`}>Column</a></li>
      <li><a href={`#ToggleContent`}>ToggleContent</a></li>
    </ul>
  )
}

Navigation.propTypes = {
  components: PropTypes.array.isRequired
};

export default Navigation;