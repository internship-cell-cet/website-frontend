import styled from 'styled-components';

export const StyledJobForm = styled.div`
  display: table;
  height: 88vh;
  width: 100%;
  padding-top: 1%;

  .background {
    display: table-cell;
    vertical-align: middle;
    padding: 0;
    box-shadow: 2px 2px 2px 2px;
    border-radius: 30px;
  }

  .card-head { 
    font-size: 25px;
    margin-bottom: 2%;
  }

  .post-icon img {
    margin-left: 10px;
    margin-bottom: 6px;
    width: 20px;
    height: 20px;
  }

  #dropdown-basic-button {
    width: 100%;
    background-color: #343a40;
    border-color: #343a40;
  }

  .invalid-message {
    width: 100%;
    color: red;
    font-size: 80%;
    margin-top: .25rem;
  }
  
  .dropdown-menu {
    width: 100%;
  }

  .invalid-feedback {
    text-align: left;
  }
`;
