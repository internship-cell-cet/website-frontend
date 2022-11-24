import React from 'react';

import seekerRegisterImage from '../../assets/images/seekerRegisterImage.png';
import { StyledAuthImage } from './AuthImageStyle';

const AuthImage = () => (
  // <StyledAuthImage src={authImage} />
  <StyledAuthImage>
    <div className='imageContainer'>
      <div className = 'imageText'>
        Discover Your
      </div>
      <div className = 'imageText'>
        <span className='imageTextEmphasize'>Dream Job</span> Here.
      </div>
      <img className="registerImage" src={seekerRegisterImage}/>
    </div>
  </StyledAuthImage>
);

export default AuthImage;
