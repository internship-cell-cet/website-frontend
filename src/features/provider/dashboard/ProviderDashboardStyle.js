import styled from 'styled-components';

export const StyledProviderDashboard = styled.div`
  .dashboard-body {
    width:90%;
    margin: auto;
    margin-top: 20px;
    border-radius: 20px; 
    border: 3px solid transparent;
    box-shadow: 0 0 20px #a8a7a7;
    margin-bottom: 20px;
  }

  .job-category-header {
    margin-left: 20px;
    font-size: 27px;
    font-weight: bold;
    display: flex;
  }

  .provided-job-list {
    display: flex;
  }

  .add-icon {
    margin-left: 10px;
    margin-bottom: 4px;
    cursor: pointer;
    width: 30px;
  }

  .company-description-content {
    text-align: left;
    margin-left: 20px;
  }

  .company-description-header {
    margin-left: 20px;
    font-size: 27px;
    font-weight: bold;
    display: flex;
  }

  .provider-details {
    margin: auto;
  }

  .provider-details-image {
    margin: auto;

    .provider-image {
      width: 200px;
    }
  }

  .jobs-not-created {
    margin-top: 75px;
    margin-bottom: 100px;
  }

  .card-row {
    width: 100%;
  }
`;
