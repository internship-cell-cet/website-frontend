import React from 'react';
import PropTypes from 'prop-types';

const UserTypeRadio = ({ title, imgSrc, className, onClick }) => (
  <label className="custom-radio">
    <input className={className} type="radio" name="radio" onClick={onClick}/>
    <span className="radio-btn">
      <div className="radio-card-header">
        {title}
      </div>
      <img src={imgSrc} />
    </span>
  </label>
);

UserTypeRadio.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default UserTypeRadio;
