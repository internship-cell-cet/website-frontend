import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { Form, Button } from 'react-bootstrap';

import { StyledProviderRegister } from './ProviderRegisterFormStyle';
import { imageUpload, registerProvider } from '../userSlice';
import { StyledBackground } from '../UserStyle';
import { isValidMobileNumber } from '../../../helpers/utils';
import { showAppToast } from '../../../appSlice';
import { UNKNOWN_ERROR_MSG } from '../../../app/constants';
import { user } from '../userSelectors';

const validate = ({ mobileNum, website, description, address, image }) => {
  const validateErrors = {};
  if (mobileNum === '') {
    validateErrors.mobileNum = 'Mobile number is missing';
  } else if (!isValidMobileNumber(mobileNum)) {
    validateErrors.mobileNum = 'Enter a valid mobile number';
  }

  if (!image) {
    validateErrors.image = 'Upload image';
  }

  if (!website.trim()) {
    validateErrors.website = 'Website is missing';
  }

  if (!description.trim()) {
    validateErrors.description = 'Description is missing';
  } else if (description.length > 1000) {
    validateErrors.description = 'Description should be less than 1000 characters';
  }

  if (!address.trim()) {
    validateErrors.address = 'Address is missing';
  }

  return validateErrors;
};

const ProviderRegisterForm = () => {
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [error, setError] = useState({});
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const provider = useSelector(user);

  const handleImage = (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    setImage(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerInputs = { mobileNum, website, description, address, image };
    const validatedErrors = validate(registerInputs);
    setError(validatedErrors);

    if (Object.keys(validatedErrors).length !== 0) {
      return;
    }

    dispatch(registerProvider(registerInputs)).then(({ meta, payload }) => {
      if (meta.requestStatus === 'rejected') {
        setError({ responseError: (payload && payload.message) || UNKNOWN_ERROR_MSG });
        return;
      }
      dispatch(imageUpload(image))
        .then(() => {
          dispatch(push('/provider/dashboard'));
          dispatch(showAppToast(`Hello ${provider.firstName}! You have Successfully Registered`));
        });
    });
  };

  return (
    <StyledProviderRegister>
      <StyledBackground>
        <Form className="registration-details">
          <h1 className = "register-head"><u>REGISTER</u></h1>
          <div className="register-details">

            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                name="mobileNum"
                onChange={(e) => setMobileNum(e.target.value)}
                isInvalid={error.mobileNum}
              />
              <Form.Control.Feedback type="invalid">
                {error.mobileNum}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="website"
                placeholder="Website"
                name="website"
                onChange={(e) => setWebsite(e.target.value)}
                isInvalid={error.website}
              />
              <Form.Control.Feedback type="invalid">
                {error.website}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                type="description"
                className="text-area"
                rows={3}
                placeholder="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={error.description}
              />
              <Form.Control.Feedback type="invalid">
                {error.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                type="address"
                className="text-area"
                rows={3}
                placeholder="Address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                isInvalid={error.address}
              />
              <Form.Control.Feedback type="invalid">
                {error.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <span className="btn btn-primary btn-file">
                Upload Picture  <input type="file" accept="image/png, image/jpeg" multiple={false} onChange={handleImage} />
              </span>
              <div className="invalid-message">
                {error.image}
              </div>
            </Form.Group>

            <div className="error">{error.responseError}</div>
            <Button id="register-button" variant="primary" type="submit" onClick={handleSubmit}>
              Register
            </Button>

          </div>
        </Form>
      </StyledBackground>
    </StyledProviderRegister>
  );
};

export default ProviderRegisterForm;
