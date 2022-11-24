import React from 'react';
import { Container, Dropdown, Image, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { user } from '../../features/user/userSelectors';
import { StyledHeader } from './HeaderStyles';
import { logout } from '../../features/user/userSlice';
import { deleteAllCookies } from '../../helpers/utils';

const Header = () => {
  const currentUser = useSelector(user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    deleteAllCookies();
    dispatch(push('/user/signin'));
  };

  return (
    <StyledHeader>
      <Navbar className="nav" bg="dark">
        <Container>
          {currentUser
            ? <Navbar.Brand href="dashboard">
              <span className="heading">
                INTERNSHIP CELL CET
              </span>
            </Navbar.Brand>
            : <Navbar.Brand href="home">
              <span className="heading">
              INTERNSHIP CELL CET
              </span>
            </Navbar.Brand>
          }
          {
            currentUser
          && <span className="current-user">
            <span className="user-name">
              Hi {currentUser.firstName}
            </span>
            <Dropdown drop="left" className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                <Image className="user-image" src={currentUser.image} roundedCircle />
              </Dropdown.Toggle>

              <Dropdown.Menu align="start">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </span>}
        </Container>
      </Navbar>
    </StyledHeader>
  );
};

export default Header;
