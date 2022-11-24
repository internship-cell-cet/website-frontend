import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { hideAppToast } from '../../appSlice';
import { selectAppToast } from '../../appSelectors';
import { StyledAppToast } from './AppToastStyle';

const AppToast = () => {
  const dispatch = useDispatch();
  const { delay, autoHide, message, title } = useSelector(selectAppToast);

  const handleOnClose = () => dispatch(hideAppToast());

  return (
    <StyledAppToast
      onClose={handleOnClose}
      show={!!message}
      delay={delay || 3000}
      autohide={autoHide !== false}
    >
      {(title || autoHide === false) && <Toast.Header closeButton={autoHide === false}>
        {title}
      </Toast.Header>}

      <Toast.Body>{message}</Toast.Body>
    </StyledAppToast>
  );
};

export default AppToast;
