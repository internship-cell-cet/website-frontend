import styled from 'styled-components';

export const StyledSearchResults = styled.div`

  .applied-job-list {
    display: flex;
  }

  .recent-job-list {
    display: flex;
  }

  .dashboard-body {
    width:90%;
    margin: auto;
    margin-top: 20px;
    border-radius: 20px;
    border: 3px solid transparent;
    box-shadow: 0 0 20px #a8a7a7;
    margin-bottom: 20px;
  }

  .seeker-name {
    font-size: 27px;
    font-weight: bold;
    display: flex;
  }

  .job-category-header {
    margin-left: 20px;
    font-size: 27px;
    font-weight: bold;
    display: flex;
  }

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
    background-color:  #343a40;
    border-color: #343a40;
    width: 100%;
  }

  .skill-select {
    padding: 0px;
  }

  .company-select {
    padding: 0px;
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

  .card-row {
    width: 100%;
  }
`;
