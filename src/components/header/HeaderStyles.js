import styled from 'styled-components';

export const StyledHeader = styled.div`
  height: 81px;
  // background-color:  #343a40;

  .nav {
    height: 81px;
  }

  .heading {
    color: white;
    font-weight: bold;
  }

  .current-user {
    color: white;
    display: flex;
  }

  .logout-button {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: .7%;
    margin-right: 2%;
  }

  .user-name {
    margin-top: 17px;
    margin-right: 20px;
  }

  .dropdown-menu {
    right: 0;
  }

  .btn-primary {
    background-color:  #343a40;
    border-color: #343a40;
  }

  .btn-primary.dropdown-toggle:focus {
    box-shadow: none;
  }

  .dropdown-toggle::before {
    display: none;
  }

  .user-image {
    width: 50px;
    height: 50px;
  }

  .show>.btn-primary.dropdown-toggle {
    background-color: #343a40;
    border-color: #343a40
  }
`;
