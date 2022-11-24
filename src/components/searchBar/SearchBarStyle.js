import styled from 'styled-components';

export const StyledSearchBar = styled.div`
  .background-container {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 30vh;
  }

  .background-image {
    z-index: -1;
    height: 30vh;
    width: 100%;
    overflow: hidden;
  }

  .search-container {
    background: white;
  }

  .search-bar {
    width: 70%;
    margin: auto;
    height: 30vh;
    display: flex;
  }

  .category-select {
    padding: 0px;
  }

  #dropdown-basic-button {
    border-radius: 0;
    background-color:  #343a40;
    border-color: #343a40;
    width: 100%;
  }

  #skill-name {
    border-radius: 0;
    background-color:  white;
    border-color: #cacccb;
    color: black;
    width: 100%;
  }

  #company-name {
    border-radius: 0;
    width: 100%;
    background-color:  white;
    border-color: #cacccb;
    color: black;
  }

  .skill-select {
    padding: 0px;
  }

  .company-select {
    padding: 0px;
  }

  .dropdown-menu {
    width: 100%;
  }

  .skill-search-bar {
    border-radius: 20px;
    padding: 13px 20px 20px 20px;
    background: white;
    padding-bottom: 10px;
    width: 100%;
    align-self: center;
    border: 3px solid transparent;
    box-shadow: 0 0 20px #a8a7a7;
  }

  .search-button {
    background-color: #cacccb;
    border-color: #cacccb;
  }

  .search-button-icon {
    width: 20px;
  }
`;
