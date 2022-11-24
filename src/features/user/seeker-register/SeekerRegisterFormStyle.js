import styled from 'styled-components';

export const StyledSeekerRegister = styled.div`
  display: table;
  height: 100vh;
  width: 100%;

  .register-head-container {
    margin: auto;
    width: 70%;
    max-width: 400px;
    text-align: left;
  }

  .register-head {
    color: #363B62;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 42px;
    line-height: 63px;
  }

  input {
    background: #F7F7F7;
    border: 0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    color: #888888;
  }

  .search-wrapper {
    background: #F7F7F7;
    border: 0;
  }

  .dropdown #dropdown-basic-button {
    background: #F7F7F7;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    color: #888888;
    text-align: -webkit-left;
    border: 0;
   }

   .dropdown-toggle::after {
    position: absolute;
    top: 45%;
    right: 5%;
    width: 12px;
    height: 12px;
   }

  .col .form-grou{
    background: white;
  }
  
  .multiselect-container {
    margin-top: 3%;
  }

  .search-wrapper {
    border-radius: 30px;
  }

  #dropdown-basic-button {
    background-color: white;
    border-color: #ced4da;
    border-radius: 30px;
    color: black;
    width: 100%;
  }

  .dropdown-menu {
    width: 100%;
  }

  .btn-file {
    position: relative;
    background-color: white;
    overflow: hidden;
    color: #888888;
  }

  .btn-primary {
    border: 0;
  }

  .btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);

    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }

  .invalid-message {
    width: 100%;
    color: red;
    font-size: 80%;
    margin-top: .25rem;
  }

  .upload-icon {
    width: 18px;
  }

  .register-button {
    background-color: #5C6DFF;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
  }

`;
