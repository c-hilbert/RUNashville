import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ text }) => (
  <div className="section-title">
    <div className="section-title-text">{text}</div>
    <div className="section-title-divider" />
  </div>
);

SectionTitle.propTypes = ({
  text: PropTypes.string.isRequired,
});

export default SectionTitle;
