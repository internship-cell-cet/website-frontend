import styled from 'styled-components';

// import authImage from '../../assets/images/mobile.svg';

export const StyledUserContainer = styled.div`
  // padding: 0 15px;

  .hidden-sm {
    overflow-y: hidden;
  }

  .user-row{
    width: 100%;
    margin: 0;
  }
  @media (min-width: 767px) {
    .mobile-auth-container {
      display: none;
    }

    .mobile-auth-image {
      display: none;
    } 

  }


  @media (max-width: 767px ){
    .mobile-auth-container {
      display: block;
      position: absolute;
      width: 100%;
      padding: 0;
      left: 0;
      // z-index: 1;
    }

    .mobile-auth-image {
      display: block;
      width: 100%;
    } 

  }
`;

export const StyledBackground = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding: 0 15px;
  

  .registration-details {
    padding-top: 10%;
    padding-bottom: 20%;
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
  }

  .register-head {
    width: 70%;
    max-width: 400px;
    margin: auto;
    text-align: center;
    margin-bottom: 3%;
    padding-top: 5%;
  }

  .register-details {
    margin: auto;
    width: 70%;
    max-width: 400px;
  }

  .form-control {
    border-radius: 30px;
  }

  .text-area {
    border-radius: 10px;
  }

  .error {
    font-weight: bold;
    color: red;
    margin-bottom: 3%;
  }

  #register-button {
    width: 70%;
    max-width: 400px;
    border-radius: 30px;
  }

  .invalid-feedback {
    text-align: left;
    margin-left: 5%;
  }
`;
