import styled from 'styled-components';

export const StyledProviderRegister = styled.div`
  display: table;
  height: 100vh;
  width: 100%;

  .btn-file {
    position: relative;
    background-color:lightseagreen;
    border-radius:20px;
    overflow: hidden;
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
`;
