import styled from 'styled-components';

export const StyledAuthImage = styled.div`
  position: absolute;
  width: 200%;
  height: 300%;
  top: -100%;
  left: -100%;
  border-radius: 50%;

  background-color: #5C6DFF;

  .imageContainer {
    position: absolute;
    top: 39%;
    left: 50%;
    z-index: 1;
    width: 40%;
    max-width: 500px;
    height: 25%; 
  }

  .imageText {
    color: white;
    font-size: 35px;
    text-align: left;
    padding-left: 30px;
    height: 40px;
  }

  .imageTextEmphasize {
    font-weight: 600;
  }

  .registerImage {
    position: absolute;
    top: 20%;
    left: 10%;
    z-index: 1;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

`;
