import styled from 'styled-components';

export const StyledSigninForm = styled.div`
  display: table;
  height: 100vh;
  width: 100%;

  .signup-link {
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

  .cell-image-container {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .cell-image {
    width: 15%;
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
