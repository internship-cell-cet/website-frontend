import styled from 'styled-components';

const violet = '#8373e6';

export const StyledSignupForm = styled.div`
  display: table;
  height: 100vh;
  width: 100%;

  #signup-button {
    width: 70%;
    border-radius: 30px;
  }

  .user-type-header {
    margin: 0 0 80px 0;
    color: ${violet};
    font-size: 30px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }

  .radio-buttons {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .custom-radio input {
    display: none;
  }

  .radio-card-header {
    margin: 20px 0 40px 0;
    color: ${violet};
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
  }

  .radio-btn {
    margin: 10px;
    width: 180px;
    height: 200px;
    border: 3px solid transparent;
    display: inline-block;
    border-radius: 10px;
    position: relative;
    text-align: center;
    box-shadow: 0 0 20px #a8a7a7;
    cursor: pointer;
  }

  img {
    width: 64px;
    height: 64px;
  }

  .back-icon-container {
    margin-left: 5%;
    text-align: left;

    button {
      border: 0;
      background-color: white;
    }
  }

  .back-arrow-icon {
    width: 40px;
    height: 40px;
  }

  .custom-radio .selected + .radio-btn {
    border: 3px solid ${violet};
  }

  .next-button-container {
    margin-top: 5%;
  }

  .next-button {
    background-color: ${violet};
    border-color: ${violet};
    width: 30%;
  }

  .login-link {
    margin-top: 2%;
  }

  .register-head {
    text-align: left !important;
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-weight: 550;
    color: rgb(54, 59, 98)
  }

  .form-control {
    border: none;
    background-color: rgb(247, 247, 247);
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    padding-top: 1.5rem;
    padding-bottom: 1.7rem;
    padding-left: 1.5rem;
  }

  .form-input {
    background: rgb(247, 247, 247);
  }

  #register-button {
    background: rgb(92, 109, 255);
    border: none;
    font-weight: 600;
    padding: .4rem;
    font-size: 1.2rem;
  }

  #register-button:hover {
    background: rgb(92, 109, 255, .3);
    color: rgb(92, 109, 255);
  }

`;
